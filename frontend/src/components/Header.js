import React from 'react'
import "./header.css"
import { NavLink,useNavigate } from "react-router-dom";
import {parseJwt} from "../tools"

export default function Header() {
  const Navigate = useNavigate();
  const logout=()=>{
    localStorage.setItem("token",null);
    Navigate("/", {replace: true})
    window.location.reload();
  }


  return (
    <header>
        <div className='container'>
            <NavLink to="/" className="logo"> <img src={require("../images/tomato icon.png")}/> </NavLink>
            <nav>
                {localStorage.getItem("token")!=="null"?<NavLink to="/profile"> profile </NavLink>:""}
                {parseJwt(localStorage.getItem("token"))?.role==="admin"?<NavLink to="/admin"> admin </NavLink>:""}
                {localStorage.getItem("token")==="null"?<NavLink to="/register"> sginup </NavLink>:""}
                {localStorage.getItem("token")==="null"?<NavLink to="/login" className="sginin"> sginin </NavLink>:""}
                {localStorage.getItem("token")!=="null"?<span onClick={logout}> logout </span>:""}
            </nav>
        </div>
    </header>
  )
}