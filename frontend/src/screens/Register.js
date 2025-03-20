import React,{useState} from 'react'
import "./register.css"
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import shimg from "../images/tomato icon.png"
import Swal from 'sweetalert2'
import { BACKEND_DOMAIN } from '../tools';
import LoadingSpinnerunvis from "../components/LoadingSpinnerunvis"

export default function Register() {
  const Navigate = useNavigate();

  const [inputs,setInputs] = useState({
    UserName:"",
    Email:"",
    Password1:"",
    Password2:""
  })

  const [loading, setloading] = useState(true);


  const handleChange=(e)=>{
    setInputs((prev)=>({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  const submithandler=(e)=>{
    e.preventDefault();
    setloading(false);

    Axios.post( 
      BACKEND_DOMAIN+'/api/auth/register',
      inputs
    ).then((response)=>{
      console.log(response)
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
        title: "تم ارسال ايميل التفعيل"
      })
      Navigate("/login", {replace: true})
    }).catch(e=>{
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
        icon: 'error',
        title: e.response.data.msg
      })
    });  
  }
  
  return (
    <>
    {!loading?<LoadingSpinnerunvis/>:""}
    <form className="register-form">
      <div className='right'>
        <Link to="/">
        <img src={shimg} alt="logo" className='logo'/>
        </Link>
        <h1>sginup</h1>
        <label>
          <div>
          Name:
          </div>
          <input type="text" placeholder="Name" name='UserName' onChange={handleChange}/>
        </label>
        <label>
          <div>
          Email:
          </div>
          <input type="text" placeholder="Email" name='Email' onChange={handleChange}/>
        </label>
        <label>
          <div>
          Phone Number:
          </div>
          <input type="text" placeholder="Phone Number" name='Phone' onChange={handleChange}/>
        </label>
        <label>
          <div>
          Address
          </div>
          <input type="text" placeholder="Address" name='Address' onChange={handleChange}/>
        </label>
        <label>
          <div>
          Password:
          </div>
          <input type="password" placeholder="Password" name='Password1' onChange={handleChange}/>
        </label>
        <label>
          <div>
          Repeat Password:
          </div>
          <input type="password" placeholder="Repeat Password" name='Password2' onChange={handleChange}/>
        </label>
        <button onClick={submithandler}>sginup</button>
        <Link to="/login"  style={{"color":"#3f51b5","marginTop":"10px","display":"inline-block"}}>
        sginin
        </Link>
      </div>
      
    </form>
    </>
  )
}
