import React,{useContext, useEffect, useRef, useState} from 'react'
import "./header.css"
import { NavLink,useNavigate,Link } from "react-router-dom";
import Axios from "axios"
import { parseJwt,BACKEND_DOMAIN,MyContext } from '../tools';
import LoadingSpinner from './LoadingSpinner';
export default function Header() {
  const Navigate = useNavigate();
  const sidenav = useRef(null)
  const dropdown = useRef(null)

  const { cart, setcart} = useContext(MyContext);

  const [loading, setloading] = useState(true)

  const logout=()=>{
    localStorage.setItem("token",null);
    Navigate("/", {replace: true})
    window.location.reload();
  }

    useEffect(() => {
      const config = {
       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      if(localStorage.getItem("token")!=="null")
      Axios.get( 
      BACKEND_DOMAIN+`/api/auth/getme`,
      config,
      ).then((Response)=>{
        setcart(Response.data.Cart.length);
        setloading(true);
    }).catch((e)=>{
      if(e.response.data === "not authorized")
      {
        logout();
      }
    });

  }, [])
  
  
  return (
    <>
      <header>
        <div className='container appheader'>
          <div className="head_container">
          <NavLink to="/" className="logo">
            <img src={require("../images/tomato icon.png")} alt="logo"/>
          </NavLink>
          <div className="menu" id="myTopnav">
            <ul style={{"display":"flex","alignItems":"center","position":"relative"}}>
              <div className='burg' onClick={()=>sidenav.current.style.width="250px"}>&#9776;</div>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/order"> Order</NavLink></li>
              {localStorage.getItem("token")!=="null"?<NavLink to="/cart" className="cart">
                <i className="fa-solid fa-cart-shopping"></i>
                <div>{cart}</div>
              </NavLink>:""}
              <div className='avatardiv' style={{"position":"relative"}}>
                <img src={require("../images/empty pizza.png")} alt="avatar" className='avatar' onClick={()=>dropdown.current.classList.toggle("active")}/>
                <div className='dropdown' ref={dropdown}>
                  {localStorage.getItem("token")!=="null"?<NavLink to="/myorder"> My Orders </NavLink>:""}
                  {localStorage.getItem("token")!=="null"?<NavLink to="/saved"> Saved </NavLink>:""}
                  {parseJwt(localStorage.getItem("token"))?.role==="admin"?<NavLink to="/admin"> admin </NavLink>:""}
                  {localStorage.getItem("token")!=="null"?<span onClick={logout}>Logout</span>:""}
                  {localStorage.getItem("token")=="null"?<NavLink to="/login"> login </NavLink>:""}
                  {localStorage.getItem("token")=="null"?<NavLink to="/register"> register </NavLink>:""}

                </div>
              </div>
            </ul>
          </div>
        </div>
        </div>
      </header>
      
      {!loading?<LoadingSpinner/>:""}

      <div id="mySidenav" className="sidenav" ref={sidenav}>
        <div className='burg x' onClick={()=>sidenav.current.style.width="0"}>&times;</div>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/order"> Order</NavLink></li>
      </div>
    </>
  )
}




                // {localStorage.getItem("token")!=="null"?<NavLink to="/order"> order </NavLink>:""}
                // {localStorage.getItem("token")!=="null"?<NavLink to="/myorders"> MyOrders </NavLink>:""}
                // {localStorage.getItem("token")!=="null"?<NavLink to="/profile"> profile </NavLink>:""}
                // {parseJwt(localStorage.getItem("token"))?.role==="admin"?<NavLink to="/admin"> admin </NavLink>:""}
                // {localStorage.getItem("token")==="null"?<NavLink to="/register"> sginup </NavLink>:""}
                // {localStorage.getItem("token")==="null"?<NavLink to="/login" className="sginin"> sginin </NavLink>:""}
                // {localStorage.getItem("token")!=="null"?<span onClick={logout}> logout </span>:""}
