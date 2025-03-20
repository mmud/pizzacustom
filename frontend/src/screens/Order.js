import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import  Axios  from 'axios'
import { BACKEND_DOMAIN, MyContext } from '../tools'
import Swal from 'sweetalert2'
import LoadingSpinnerunvis from '../components/LoadingSpinnerunvis'
import LoadingSpinner from '../components/LoadingSpinner'
import "./order.css"
export default function Order() {
    const [loading, setloading] = useState(true);
    const [loadingcode, setloadingcode] = useState(true);

    const { cart, setcart,cartincrement } = useContext(MyContext);

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
    
    
    const [price, setprice] = useState(10);
    const [ctn, setctn] = useState(1);
    const [selected, setselected] = useState([]);
    const [ings, setings] = useState([]);

    const checkboxhandler=(obj,event)=>
    {
        if(event.target.checked)
        {
            setselected([...selected,obj]);
        }
        else
        {
            setselected(selected.filter((a)=>a._id!=obj._id))
        }
    }
    
    useEffect(() => {
        let counter=10;
        selected.forEach(element => {
            counter+=Number(element.Price);
        });
        setprice(counter*ctn);

        setings(selected.map((q)=>q._id));
    }, [selected,ctn])
    

    const submithandler=(e)=>{
        e.preventDefault();
        if(ings===undefined||ings.length==0)
            return;
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
         };
    
        setloadingcode(false);
        Axios.post( 
          BACKEND_DOMAIN+'/api/cart',
          {ings:ings,count:ctn},
          config
        ).then((response)=>{
          setloadingcode(true);
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
          setrefresh(refresh+1);
          cartincrement();
          Toast.fire({
            icon: 'success',
            title: "pizza added to the cart"
          })
    
        }).catch(e=>{
          setloadingcode(true);
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

      const increment = () =>{
        if(ctn==20)return;
        setctn(ctn + 1);
      }
      const decrement = () =>{
        if(ctn==1)return; 
        setctn(ctn - 1);
      }
    

  return (
    <>
        {!loading?<LoadingSpinner/>:""}
        {!loadingcode?<LoadingSpinnerunvis/>:""}
    <div className='orderdiv container'>
      <div className='left'>
        <h1>Opitions</h1>
        <div className="cont">
            {
                qs.map((q,i)=>{return(
                <label key={i} className="option_item">
                    <input type="checkbox" className="checkbox" onChange={(e)=>checkboxhandler(q,e)}/>
                    <div className="option_inner">
                        <div className="tickmark"></div>
                        <div className="icon"><img src={BACKEND_DOMAIN+`${q.Imgsmall}`}/></div>
                    </div>
                </label>
                )})
          
            }
        </div>
        <div className='commands'>
        <div className="counter-container" style={{textAlign:"center"}}>
          <button className="counter-button" onClick={decrement}>
            -
          </button>
          {ctn}
          <button className="counter-button" onClick={increment}>
            +
          </button>
        </div>
        <button onClick={submithandler}>order</button><i class="fa-solid fa-bookmark"></i> price: {price} EGP
        </div>
      </div>
      <div className='right'>
        <div className='pizza'>
            <img src={require("../images/empty pizza.png")}/>
            {
                selected.map((q,i)=><img className='ing' src={BACKEND_DOMAIN+`${q.Imgbig}`} style={{"zIndex":`${q.Level}`}}/>)
            }
        </div>
      </div>
    </div>
    </>
  )
}
