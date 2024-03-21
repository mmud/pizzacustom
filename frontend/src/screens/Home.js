import React from 'react'
import landing from "../images/landing.png"
import "./Home.css"
import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div className="landing">
        <div className="text">
            <h1>Custom Pizza</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
           <NavLink to="/order" className="sginin"> order now </NavLink>
        </div>
        <img src={landing} alt="" className="landimg"/>
    </div>
  )
}
