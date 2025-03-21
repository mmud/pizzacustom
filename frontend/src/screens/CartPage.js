import React, { useState, useEffect, useContext } from "react";
import "./CartPage.css";
import Swal from "sweetalert2";
import { NavLink,useNavigate,Link, Navigate } from "react-router-dom";
import Axios from "axios"
import { parseJwt,BACKEND_DOMAIN,MyContext } from '../tools';
import LoadingSpinner from "../components/LoadingSpinner";
import CartItem from "../components/CartItem";
const CartPage = () => {
  const [cart, setcart] = useState([]);
  const [loading, setloading] = useState(true)
  const [refresh, setrefresh] = useState(0)

    const { cartdecrement } = useContext(MyContext);
  

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
      BACKEND_DOMAIN+`/api/cart`,
      config,
      ).then((Response)=>{
        setcart(Response.data);
        console.log(Response.data);
        setloading(true);
    }).catch((e)=>{
      if(e.response.data === "not authorized")
      {
        logout();
      }
    });

  }, [refresh])
  
  //delete
   const deletecart=async(_id)=>{
    
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       };
  
      const inputs={cartItemId:_id};
      setloading(false);
      Axios.post( 
        BACKEND_DOMAIN+`/api/cart/delete`,
        inputs,
        config
      ).then((response)=>{
        setloading(true);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        cartdecrement();
        Toast.fire({
          icon: 'success',
          title: "تمت العمليه بنجاح"
        })
  
        setrefresh(refresh+1);
  
      }).catch(e=>{
        setloading(true);
        if(e.response.data === "not authorized")
        {
          logout();
        }
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: e.response.data.msg
        })
      });
  
    }

    const updatecart=async(_id,count)=>{
    
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       };
  
      const inputs={cartItemId:_id,count};
      setloading(false);
      Axios.post( 
        BACKEND_DOMAIN+`/api/cart/update`,
        inputs,
        config
      ).then((response)=>{
        setloading(true);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: "تمت العمليه بنجاح"
        })
  
        setrefresh(refresh+1);
  
      }).catch(e=>{
        setloading(true);
        if(e.response.data === "not authorized")
        {
          logout();
        }
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: e.response.data.msg
        })
      });
  
    }

  return (
    <>
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty 🛒</h2>
      ) : (
        cart.map((item) => (
          <CartItem Data={item} deletefun={deletecart} updatefun={updatecart}/>
        ))
      )}

     
    </div>
    {!loading?<LoadingSpinner/>:""}
    </>
  );
};

export default CartPage;
