import * as React from "react"
import { useState, useEffect } from "react"
import "./Sidebar.css"

export default function Sidebar({ shoppingCart, user, setUser, request, setRequest, checkout, setCheckout, receipt, setReceipt }) {
  const [open, setOpen] = useState(false)
  const [grid, setGrid] = useState(null)
  const [total, setTotal] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const handleInputChange1 = (event) => {
    const newName = event.target.value
    setName(newName)
    setUser({...user, name: newName})
  }
  const handleInputChange2 = (event) => {
    const newEmail = event.target.value
    setEmail(newEmail)
    setUser({...user, email: newEmail})
  }
  function fixPrice(price) {
    price = Number(price)
    const formattedPrice = `${price.toFixed(2)}`
    return formattedPrice
}
  useEffect(() => {
    const generateGrid = () => {
      if (shoppingCart.length === 0) {
        setGrid(<div className="empty-cart">No items added to cart yet. Start shopping now!
        </div>)
      } else {
        const gridJSX = shoppingCart.map((item, index) => (
          <ul key={index}>
            <li>{item.name}</li>
            <li>{item.quantity}</li>
            <li>${item.price.toFixed(2)}</li>
            <li>${item.totalPrice.toFixed(2)}</li>
          </ul>
        ))
        let tempTotal = 0
      shoppingCart.forEach((item) => {
        tempTotal += item.totalPrice
      })
        setTotal(tempTotal)
        setGrid(gridJSX)
    }
    }
    generateGrid()
  }, [shoppingCart])

  return (
    <section className="sidebar">
      <div onClick={() => setOpen(!open)}>
        <div>
        <i className={`fa-solid fa-arrow-right ${open ? `open` : `closed`}`}></i>
        </div>
        <div>
        <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
      {open && (
        <div className="sidebar-content">
          <div>Shopping Cart</div>
          <div className="cart">
            {shoppingCart.length > 0 && (
              <ul className="grid-titles">
                <li>Name</li>
                <li>Quantity</li>
                <li>Unit Price</li>
                <li>Total Price</li>
              </ul>
            )}
            {open && <div className="grid-content">{grid}</div>}
            {shoppingCart.length > 0 && (
              <ul className="sub-totals">
                <div className="sub-totals-content">
                  <li>Subtotal</li>
                  <li>${total.toFixed(2)}</li>
                </div>
                <div className="sub-totals-content">
                  <li>Taxes and Fees</li>
                  <li>${(total * 0.0875).toFixed(2)}</li>
                </div>
                <div className="sub-totals-content">
                  <li>Total</li>
                  <li>${(total + (total * 0.0875)).toFixed(2)}</li>
                </div>
              </ul>
            )}
            {shoppingCart.length > 0 && (
              <div className="inputs-wrapper">
                <div>Payment Info</div>
                <form className="inputs">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="Student name"
                    value={name}
                    onChange={handleInputChange1}
                  ></input>
                  <label htmlFor="email">Email</label>
                  <input
                    required
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="student@codepath.org"
                    value={email}
                    onChange={handleInputChange2}
                  ></input>
                </form>
              </div>
            )}
            {!checkout && shoppingCart.length > 0 && (
            <div>
              <input required type="checkbox" id="myCheckbox" size="30" checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}></input>
              I agree to the terms and conditions.
            </div>
            )}
            {(isChecked && name && email && shoppingCart.length > 0) &&
            <button
              className="checkout"
              onClick={() => {
                let req = {
                  user: { name: name, email: email },
                  shoppingCart: shoppingCart
                };
                setRequest(req);
                setCheckout(true);
              }}
              
            >
              Checkout
            </button>
            }
            {(!isChecked || !name || !email) &&
            <button
              className="checkout greyed-out">
              Checkout
            </button>
            }
            {checkout && (
              <div>
                <b>Receipt for {name}</b>
                <div className="receipt">
                  {
                  receipt.map((item) => (
                    <div key={item.name}>{item.quantity} total {item.name} purchased at a cost of ${fixPrice(item.price)} for a total cost of ${fixPrice(item.totalPrice)}
                    </div>
                  ))}
                </div>
                <div>Before taxes, the subtotal was ${fixPrice(total.toFixed(2))}</div>
                <div>
                  After taxes and fees were applied, the total comes out to ${fixPrice((total + total * 0.0875).toFixed(2))}<br/><br/>Thank you for your purchase!
                </div>
                
                <button className="checkout exit" onClick={() => setCheckout(false)}>Exit</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )}  
