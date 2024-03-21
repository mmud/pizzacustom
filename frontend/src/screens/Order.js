import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import  Axios  from 'axios'
import { BACKEND_DOMAIN } from '../tools'
import Swal from 'sweetalert2'
import LoadingSpinnerunvis from '../components/LoadingSpinnerunvis'
import LoadingSpinner from '../components/LoadingSpinner'
import "./order.css"
export default function Order() {
    const [loading, setloading] = useState(true);
    const logout=()=>{
        localStorage.setItem("token",null);
        Navigate("/", {replace: true})
        window.location.reload();
      }
    
    const [qs, setqs] = useState([])
    const [num, setnum] = useState(1)
    const [refresh, setrefresh] = useState(1)
    //get codes
    useEffect(() => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       };
      setloading(false);
      Axios.get( 
        BACKEND_DOMAIN+`/api/ing?num=1&type=""&s=""`,
        config
      ).then((response)=>{
        setloading(true);
        setqs(response.data);
        console.log(response);
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
    
      
    }, [num,refresh])
    
    
    const [price, setprice] = useState(0)

  return (
    <>
        {!loading?<LoadingSpinner/>:""}
    <div className='orderdiv container'>
      <div className='left'>
        <h1>Opitions</h1>
        <div className="cont">
            {
                qs.map((q,i)=>{return(
                <label className="option_item">
                    <input type="checkbox" className="checkbox"/>
                    <div className="option_inner">
                        <div className="tickmark"></div>
                        <div className="icon"><img src={BACKEND_DOMAIN+`${q.Imgsmall}`}/></div>
                    </div>
                </label>
                )})
          
            }
        </div>
        <div className='commands'>
        <button>order</button> price: {price} EGP
        </div>
      </div>
      <div className='right'>
        <div className='pizza'>
            <img src={require("../images/empty pizza.png")}/>
            {<img className='ing' src={require("../images/tomato sauce.png")}/>
            }
        </div>
      </div>
    </div>
    </>
  )
}
