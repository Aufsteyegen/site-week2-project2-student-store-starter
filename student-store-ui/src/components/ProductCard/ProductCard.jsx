import * as React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./ProductCard.css"

export default function ProductCard({ product, productId, 
    handleAddItemToCart, handleRemoveItemFromCart, showDescription, shoppingCart }) {
    const [quantity, setQuantity] = useState(0)
    useEffect(() => {
        function findQuantity() {
            const item = shoppingCart.find((cartItem) => cartItem["name"] === product["name"])
            if (item) {
                const existingItemIndex = shoppingCart.indexOf(item)
                setQuantity(shoppingCart[existingItemIndex]["quantity"])
            }
            else {
                setQuantity(0)
            }
        }
        findQuantity()
    }, [shoppingCart])
    
    function fixPrice(price) {
        price = Number(price)
        const formattedPrice = `$${price.toFixed(2)}`
        return formattedPrice
}
    return (
        <div className="product-card">
            <div className="media">
                <Link to={`/products/${productId}`}>
                    <img src={product.image} />
                </Link>
            </div>
            <div className="card-info">
                <div className="main-info">
                    <div className="product-name"><b>{product.name}</b><br/> ⭐️⭐️⭐️⭐️</div>
                    <div className="product-price">{fixPrice(product.price)}</div>
                    {showDescription ? <div className="product-description">{product.description}</div> : null}
                </div>
                <div className="actions">
                    <button className="add" onClick={() => handleAddItemToCart(product)}>+</button>
                    <button className="remove" onClick={() => handleRemoveItemFromCart(product)}>—</button>
                    {quantity > 0 && <div className="product-quantity">{quantity}</div>}
                </div>
            </div>
        </div>
    )
}