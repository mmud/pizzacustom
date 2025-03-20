import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import  Axios  from 'axios'
import { BACKEND_DOMAIN } from '../tools'
import Swal from 'sweetalert2'
import LoadingSpinnerunvis from '../components/LoadingSpinnerunvis'
import LoadingSpinner from '../components/LoadingSpinner'
import "./order.css"
import Ordercomponent from './Ordercomponent.js'
export default function Myorders() {
    const [loading, setloading] = useState(true);
    const [loadingcode, setloadingcode] = useState(true);

    const logout=()=>{
        localStorage.setItem("token",null);
        Navigate("/", {replace: true})
        window.location.reload();
      }
    
    const [num, setnum] = useState(1)
    const [refresh, setrefresh] = useState(1)
    //get codes
    useEffect(() => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       };
      setloading(false);
      Axios.get( 
        BACKEND_DOMAIN+`/api/order`,
        config
      ).then((response)=>{
        setloading(true);
        setselected(response.data);
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
    
    
    const [price, setprice] = useState(10)
    const [selected, setselected] = useState([]);

    useEffect(() => {
        let counter=10;
        selected.forEach(element => {
            counter+=Number(element.Price);
        });
        setprice(counter);

    }, [selected])
    
  return (
    <>
        {!loading?<LoadingSpinner/>:""}
        {!loadingcode?<LoadingSpinnerunvis/>:""}
        <h1 className='header'>My Orders</h1>

    <>
      
      {selected.map((e)=><Ordercomponent selected={e.ings}/>)
      }
    </>
    </>
  )
}
