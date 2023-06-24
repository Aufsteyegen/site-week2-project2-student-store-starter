import * as React from "react"
import { useState, useEffect } from "react"
import "./SubNavbar.css"

// search products
//set search products
export default function SubNavbar(props) {
    const filters = ["—", "All Categories", "Clothing", "Food", "Accessories", "Tech"]
    const [searchVal, setSearchVal] = useState("")
    function filterData(index) {
        const newActiveButton = props.activeButton.map((button, i) => i === index)
        props.setActiveButton(newActiveButton)
    }
    useEffect(() => {
        const doSearch = () => {
          const filteredProducts = props.products.filter((product) => {
            let searchValLower = searchVal.toLocaleLowerCase()
            let productName = product.name.toLowerCase()
            let productDescription = product.description.toLowerCase()
            let productCategory = product.category.toLowerCase()
            return (productName.includes(searchValLower) ||
                    productDescription.includes(searchValLower) ||
                    productCategory.includes(searchValLower))
          })
          props.setSearchProducts(filteredProducts)
        }
        doSearch()
      }, [searchVal, props.products])
    return (
      <nav className="sub-navbar">
        <div className="sub-content">
          <div className="row">
            <div className="search">
              <input type="text" placeholder="Search" value={searchVal}
               onChange={(e) => setSearchVal(e.target.value)}></input>
            </div>
          </div>
          <div className="row">
            <ul>
              <div className="filter">
                {filters.map((filter, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={() => filterData(index)}
                        className={props.activeButton[index] ? "active-button" : ""}
                      >
                        {filter}
                      </button>
                    </li>
                  );
                })}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
  