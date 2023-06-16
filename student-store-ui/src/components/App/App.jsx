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
    const [open, setOpen] = useState(false)
    const [shoppingCart, setShoppingCart] = useState([])
    const [checkoutForm, setCheckoutForm] = useState("")
    useEffect(() => {
      const getProducts = async () => {
        setIsFetching(true)
        try {
          const url = `https://codepath-store-api.herokuapp.com/store`
          const response = await axios.get(url)
          const data = await response.data
          setProducts(data.products)
        } catch (error) {
          console.error('Error fetching products:', error)
          setError(error)
        } finally {
          setIsFetching(false);
        }
      }
      getProducts()
    }, [])
    if (isFetching) {
      return <div>Loading...</div>
    }
    return (
        <div className="app">
          <BrowserRouter>
          <main>
            <Navbar />
            <Sidebar /> 
            <Routes>
              <Route path="/" element={
                <Home
                  products={products}
                  searchProducts={searchProducts}
                  setSearchProducts={setSearchProducts}
                  activeButton={activeButton}
                  setActiveButton={setActiveButton}
                  handleAddItemToCart
                  handleRemoveItemFromCart
                  isFetching={isFetching}
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
