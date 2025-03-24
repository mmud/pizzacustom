import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import  Axios  from 'axios'
import { BACKEND_DOMAIN } from '../tools'
import Swal from 'sweetalert2'
import LoadingSpinnerunvis from '../components/LoadingSpinnerunvis'
import LoadingSpinner from '../components/LoadingSpinner'
import "./order.css"
import OrderItem from '../components/OrderItem'

export default function AdminOrders() {

  const [loading, setloading] = useState(true);
  
  const [orders, setorders] = useState([]);
  const [num, setnum] = useState(1);
  const [refresh, setrefresh] = useState(1);

    const logout=()=>{
      localStorage.setItem("token",null);
      Navigate("/", {replace: true})
      window.location.reload();
    }

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
    setloading(false);
    Axios.get( 
      BACKEND_DOMAIN+`/api/order?num=${num}`,
      config
    ).then((response)=>{
      setloading(true);
      setorders(response.data);
      console.log(response.data);
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

  const handleChange=(id,status)=>{
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };
    setloading(false);
    Axios.post( 
      BACKEND_DOMAIN+`/api/order/updatestatus`,
      {orderId:id,status:status}
      ,
      config
    ).then((response)=>{
      for(let i=0;i<orders.length;i++)
      {
        if(orders[i]._id==id)
        {
          orders[i].Status=status;
        }
      }
      setloading(true);
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
          {!loading?<LoadingSpinner/>:""}
          <div className="admincont admin">
          <AdminHeader/>
          <div className='commands'>

          <h1>My Orders</h1>

          {
            orders.map((order)=>{
              return(
              <div className='myorder'>
                  {
                    order.Pizzas.map((item) => (
                              <OrderItem Data={item}/>
                            ))
                  }
                  <div>
                  <div className='data'>
                    <p>
                      Status: 
                      <select
                        id="order-status"
                        value={order.Status} 
                        onChange={(e)=>handleChange(order._id,e.target.value)} 
                      >
                        <option value="In Making">In Making</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </p>
                    <p>
                      Total Price:{order.TotalPrice}
                    </p>
                    <p>
                      Payment Status:<span style={{backgroundColor:order.PaymentStatus=="paid"?"green":"red"}}>{order.PaymentStatus}</span>
                    </p>
                    <p>
                      Ordered at:{order.createdAt}
                    </p>
                  </div>
                  </div>
              </div>)
            })
          }

        <div className='spacebtween'>
          <button onClick={()=>{
            if(orders.length>=10)
            setnum(num+1);
            }}>Next</button>
          <button onClick={()=>{            
            if(num>1)
              setnum(num-1);
              }}>Back</button>
        </div>
        </div>
        </div>
    </>
  )
}
