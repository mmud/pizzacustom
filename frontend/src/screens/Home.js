import React from 'react'
import landing from "../images/landing.png"
import "./Home.css"
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div className="landing">
        <div className="text">
            <h1>Custom Pizza</h1>
            <p>At Custom Pizza, you can build your pizza just the way you like it. Pick your crust, choose your favorite toppings, and enjoy a pizza made just for you. It’s quick, easy, and delicious. Start customizing now!</p>
           <NavLink to="/order" className="sginin"> order now </NavLink>
        </div>
        <img src={landing} alt="" className="landimg"/>
    </div>
  )
}
