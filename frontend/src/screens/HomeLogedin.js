import React, { useEffect, useState } from 'react'
import landing from "../images/landing.png"
import "./Home.css"
import { Navigate, NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';
import  Axios  from 'axios';
import { BACKEND_DOMAIN } from '../tools';
import PizzaCard from '../components/PizzaCard';

export default function HomeLogedin() {
    
    const [pizzas, setpizzas] = useState([]);
  
      const logout=()=>{
        localStorage.setItem("token",null);
        Navigate("/", {replace: true})
        window.location.reload();
      }
  
    useEffect(() => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       };
      Axios.get( 
        BACKEND_DOMAIN+`/api/pizza/`,
        config
      ).then((response)=>{
        setpizzas(response.data);
      }).catch(e=>{
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
    
      
    }, [])
  return (
    <>
    <div className="landing">
        <div className="text">
            <h1>Custom Pizza</h1>
            <p>At Custom Pizza, you can build your pizza just the way you like it. Pick your crust, choose your favorite toppings, and enjoy a pizza made just for you. It’s quick, easy, and delicious. Start customizing now!</p>
           <NavLink to="/order" className="sginin"> order now </NavLink>
        </div>
        <img src={landing} alt="" className="landimg"/>
    </div>
    <br/>
    <br/>
    <h1 className='rech1'>Recommendations</h1>
    <div className='reccont'>
      {
        pizzas.map((pizza)=><PizzaCard pizza={pizza}/>)
      }
    </div>
    </>
  )
}
