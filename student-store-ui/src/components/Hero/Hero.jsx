import * as React from "react"
import "./Hero.css"

export default function Hero () {
    return (
        <div className="hero">
            <div className="content">
                <div className="intro">
                    <h1>Welcome!</h1>
                    <h1>Find your merch.</h1>
                    <p>We have all kinds of goodies. Click on any of the items
                    to start filling up your shopping cart. Checkout whenever
                    you're ready.</p>
                </div>
                <div className="hero-img">
                    <img src={`../assets/studentstic.svg`} />
                </div>
            </div>
        </div>
    )
}