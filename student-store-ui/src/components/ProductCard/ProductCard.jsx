import * as React from "react"
import { Link } from "react-router-dom"
import "./ProductCard.css"

export default function ProductCard({ product, productId, quantity,
                                      handleAddItemToCart, handleRemoveItemFromCart,
                                      showDescription }) {
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
                    <button className="add" onClick={() => handleAddItemToCart(productId)}>+</button>
                    <button className="remove" onClick={() => handleRemoveItemFromCart(productId)}>—</button>
                    <div className="product-quantity"></div>
                </div>
            </div>
        </div>
    )
}