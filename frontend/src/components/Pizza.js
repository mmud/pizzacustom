import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import  Axios  from 'axios'
import { BACKEND_DOMAIN } from '../tools'
import Swal from 'sweetalert2'
import LoadingSpinnerunvis from '../components/LoadingSpinnerunvis'
import LoadingSpinner from '../components/LoadingSpinner'
import "../screens/order.css"
export default function Pizza(props) {
    
    const [selected, setselected] = useState(props.selected);
    
  return (
    <>
      <div className='right comp'>
        <div className='pizza'>
            <img src={require("../images/empty pizza.png")}/>
            {
                selected.map((q,i)=><img className='ing' src={BACKEND_DOMAIN+`${q.Imgbig}`} style={{"zIndex":`${q.Level}`}}/>)
            }
        </div>
      </div>
    </>
  )
}
