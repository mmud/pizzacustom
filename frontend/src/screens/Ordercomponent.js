import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import  Axios  from 'axios'
import { BACKEND_DOMAIN } from '../tools'
import Swal from 'sweetalert2'
import LoadingSpinnerunvis from '../components/LoadingSpinnerunvis'
import LoadingSpinner from '../components/LoadingSpinner'
import "./order.css"
export default function Ordercomponent(props) {
    
    
    const [price, setprice] = useState(10)
    const [selected, setselected] = useState(props.selected);

    useEffect(() => {
        let counter=10;
        selected.forEach(element => {
            counter+=Number(element.Price);
        });
        setprice(counter);

    }, [selected])
    
  return (
    <>
    <div className='orderdiv container'>
      <div className='right comp'>
        <div className='pizza'>
            <img src={require("../images/empty pizza.png")}/>
            {
                selected.map((q,i)=><img className='ing' src={BACKEND_DOMAIN+`${q.Imgbig}`} style={{"zIndex":`${q.Level}`}}/>)
            }
        </div>
        Price:{price}
      </div>
    </div>
    </>
  )
}
