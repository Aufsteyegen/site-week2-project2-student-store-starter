import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo"


export default function Navbar() {
    const navBar = ["Home", "About Us", "Contact Us", "Buy Now"]
  return (
    <nav className="navbar">
        <div className="nav-content">
            <div className="logo">
                <Logo />
            </div>
            <ul className="socials">
                <li><i className="fa-brands fa-twitter"></i></li>
                <li><i className="fa-brands fa-instagram"></i></li>
                <li><i className="fa-brands fa-facebook-f"></i></li>
            </ul>
            <ul className="links">
                {navBar.map((title, index) => {
                    return (
                    <li key={index}>
                        <button>{title}</button>
                    </li>
                )})}
            </ul>
        </div>
    </nav>
  )
}
