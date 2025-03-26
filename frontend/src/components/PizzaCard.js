import React, { useContext, useEffect, useState } from 'react'
import "./PizzaCard.css"
import Pizza from './Pizza'
import { BACKEND_DOMAIN, MyContext } from '../tools';
import Swal from 'sweetalert2';
import  Axios  from 'axios';
export default function PizzaCard(props) {
    const [ctn, setctn] = useState(1);
    const [price, setprice] = useState(0)
   
    const { cart, setcart,cartincrement } = useContext(MyContext);
   
    const increment = () =>{
        if(ctn==20)return;
        setctn(ctn + 1);
    }
    const decrement = () =>{
        if(ctn==1)return; 
        setctn(ctn - 1);
    }

       
    useEffect(() => {
        let counter=10;
        props.pizza.Ings.forEach(element => {
            counter+=Number(element.Price);
        });
        setprice(counter*ctn);    
    }, [ctn])
        
    
        const submithandler=(e)=>{
            e.preventDefault();
            const config = {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
             };
        
            Axios.post( 
              BACKEND_DOMAIN+'/api/cart/fast',
              {pizza:props.pizza._id,count:ctn},
              config
            ).then((response)=>{
                cartincrement();

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
                title: "pizza added to the cart"
              })
        
            }).catch(e=>{
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
    <div className='pizzacard'>
        <Pizza selected={props.pizza.Ings}/>
        <div className='commands'>
        <div className="counter-container" style={{marginLeft:"-20px"}}>
            <button className="counter-button" onClick={decrement}>
                -
            </button>
            {ctn}
            <button className="counter-button" onClick={increment}>
                +
            </button>
        </div>
            <button onClick={submithandler}>order price: {price} EGP</button>
        </div>
    </div>
  )
}
