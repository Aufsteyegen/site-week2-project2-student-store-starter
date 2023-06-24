import * as React from "react"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import axios from 'axios'
import "./App.css"

export default function App() {
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState("")
    const [activeButton, setActiveButton] = useState([false, true, false, false, false, false])
    const [products, setProducts] = useState([])
    const [searchProducts, setSearchProducts] = useState(products)
    const [shoppingCart, setShoppingCart] = useState([])
    const [request, setRequest] = useState({})
    const [checkout, setCheckout] = useState(false)
    const [receipt, setReceipt] = useState([])
    const [user, setUser] = useState({})
    function handleAddItemToCart(item) {
        const updatedCart = [...shoppingCart]
        const existingItem = updatedCart.find((cartItem) => cartItem["name"] === item["name"])
        if (existingItem) {
            const existingItemIndex = updatedCart.indexOf(existingItem)
            updatedCart[existingItemIndex]["quantity"] += 1
            updatedCart[existingItemIndex]["totalPrice"] = (updatedCart[existingItemIndex]["quantity"] *
                                                            updatedCart[existingItemIndex]["price"])
        }
        else {
            const newItem = {
                "name": item["name"],
                "quantity": 1,
                "price": item["price"],
                "totalPrice": item["price"]
            }
            updatedCart.push(newItem)
        }
        setShoppingCart(updatedCart)
    }
    function handleRemoveItemFromCart(item) {
        const updatedCart = [...shoppingCart]
        const existingItem = updatedCart.find((cartItem) => cartItem["name"] === item["name"])
        if (existingItem) {
            const existingItemIndex = updatedCart.indexOf(existingItem)
            if (updatedCart[existingItemIndex]["quantity"] > 1) {
                updatedCart[existingItemIndex]["quantity"] -= 1
                updatedCart[existingItemIndex]["totalPrice"] = (updatedCart[existingItemIndex]["quantity"] *
                                                                updatedCart[existingItemIndex]["price"])
            }
            else {
                updatedCart.splice(existingItemIndex, 1)
            }
            setShoppingCart(updatedCart)
        }
    }
    useEffect(() => {
      const getProducts = async () => {
        setIsFetching(true)
        try {
          const url = `http://localhost:3001/store`
          const response = await axios.get(url)
          const data = await response.data
          setProducts(data.products)
        } catch (error) {
          console.error('Error fetching products:', error)
          setError(error)
        } finally {
          setIsFetching(false)
        }
      }
      getProducts()
    }, [])
    useEffect(() => {
        if (checkout) {
          async function postData() {
            try {
              const response = await axios.post('http://localhost:3001/store', request)
              console.log('Response:', response.data)
              const receipt = response.data.receipt
              console.log(receipt)
              setReceipt(receipt.shoppingCart)
              setShoppingCart([])
              setRequest({})
            } catch (error) {
              console.error('Error:', error)
              
            }
          }
          postData()
        }
      }, [checkout])
      if (isFetching) {
        return <div>Loading...</div>
      }
    return (
        <div className="app">
          <BrowserRouter>
          <main>
            <Navbar />
            <Sidebar shoppingCart={shoppingCart} user={user} setUser={setUser}
                     request={request} setRequest={setRequest}
                     checkout={checkout} setCheckout={setCheckout}
                     receipt={receipt} setReceipt={setReceipt}
                      /> 
            <Routes>
              <Route path="/" element={
                <Home
                  products={products}
                  searchProducts={searchProducts}
                  setSearchProducts={setSearchProducts}
                  activeButton={activeButton}
                  setActiveButton={setActiveButton}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  isFetching={isFetching}
                  shoppingCart={shoppingCart}
                />
              } />
              <Route path="/products/:id" element={<ProductDetail products={products}/>} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
            </main>
          </BrowserRouter>
        </div>
      )
    }
