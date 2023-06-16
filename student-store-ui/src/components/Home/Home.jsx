import * as React from "react"
import "./Home.css"
import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import SubNavbar from "../SubNavbar/SubNavbar"

export default function Home({ products, searchProducts, setSearchProducts, 
                               activeButton, setActiveButton,
                               handleAddItemToCart, handleRemoveItemFromCart }) {
    const contactInfo = ["Email:", "Phone:", "Address:", "Socials:"]
    const contactInfoContent = ["code@path.org", "1-800-CODEPATH", "123 Fake Street, San Francisco, CA", ""]
    return (
    <div className="home">
        <Hero />
        <SubNavbar activeButton={activeButton} setActiveButton={setActiveButton} 
                   products={products}
                   searchProducts={searchProducts} setSearchProducts={setSearchProducts} />
        <ProductGrid products={products} searchProducts={searchProducts}
                    handleAddItemToCart={handleAddItemToCart}
                    handleRemoveItemFromCart={handleRemoveItemFromCart}
                    activeButton={activeButton} setActiveButton={setActiveButton} />
        <div className="about">
            <div className="about-content">
                <h3>About</h3>
                <div className="summary">
                    <p>The codepath student store offers great products at great prices from a great team and for a great cause.</p>
                    <p>We've searched far and wide for items that perk the interests of even the most eccentric students and decided to offer them all here in one place.</p>
                    <p>All proceeds go towards bringing high quality CS education to college students around the country.</p>
                </div>
            </div>
        </div>
        <div className="contact">
            <div className="contact-content">
            <h3>Contact Us</h3>
            <div className="contact-summary">
                <ul>
                    {contactInfo.map((info, index) => <li key={index}>{info} {contactInfoContent[index]}</li>)}
                </ul>
            </div>
        </div>
        </div>
    </div>
  )
}
