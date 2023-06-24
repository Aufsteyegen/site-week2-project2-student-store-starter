import * as React from "react"
import "./ProductGrid.css"
import ProductCard from "../ProductCard/ProductCard"
import { useEffect, useState } from "react"
 

export default function ProductGrid ({ products, searchProducts, handleAddItemToCart, handleRemoveItemFromCart, activeButton, setActiveButton, shoppingCart }) {
    const [validProducts, setValidProducts] = useState(searchProducts)
    useEffect(() => {
        const validateProducts = () => {
            if (activeButton[1] || activeButton[0]) {
                setValidProducts(searchProducts)
            }
            else if (activeButton[2]) {
                setValidProducts(searchProducts.filter((product) => product.category == "clothing"))
            }
            else if (activeButton[3]) {
                setValidProducts(searchProducts.filter((product) => product.category == "food"))
            }
            else if (activeButton[4]) {
                setValidProducts(searchProducts.filter((product) => product.category == "accessories"))
            }
            else if (activeButton[5]) {
                setValidProducts(searchProducts.filter((product) => product.category == "tech"))
            }
        } 
            validateProducts()
        }, [activeButton, searchProducts, products, setValidProducts])
    return (
        <div className="product-grid">
            <div>
                <h3>Best-Selling Products</h3>
            </div>
            <div className="product-cards">
            {validProducts.map((product, index) => <ProductCard product={product}
                                                    productId={product.id} 
                                                    handleAddItemToCart={handleAddItemToCart} 
                                                    handleRemoveItemFromCart={handleRemoveItemFromCart}
                                                    shoppingCart={shoppingCart} key={index} />)}
            </div>
        </div>

    )
}