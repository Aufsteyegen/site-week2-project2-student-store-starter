import * as React from "react"
import "./Footer.css"

export default function Footer() {
    const footerLists = ["Categories", "Company", "Support", "Account", "Socials", "Our App"];
    const footerListContent = [
      ["All Categories", "Clothing", "Food", "Accessories", "Tech"],
      ["About Us", "Find a Store", "Terms", "Sitemap", "Careers"],
      ["Contact Us", "Money Refund", "Order Status", "Shipping Info", "Open Dispute"],
      ["Login", "Register", "Account Setting", "My Orders"],
      ["Facebook", "Twitter", "LinkedIn", "Instagram", "YouTube"],
      ["appstore", "googleplay"]
    ];
  
    return (
      <div className="footer">
        {footerLists.map((name, index) => (
          <div key={index} className="footer-col">
            <h4>{name}</h4>
            <ul>
              {footerListContent[index].map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  
  