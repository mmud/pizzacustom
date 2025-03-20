import React,{useState} from 'react'
import "./register.css"
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import shimg from "../images/tomato icon.png"
import Swal from 'sweetalert2'
import { BACKEND_DOMAIN } from '../tools';
import LoadingSpinnerunvis from "../components/LoadingSpinnerunvis"
export default function Login() {
  const Navigate = useNavigate();

  const [inputs,setInputs] = useState({
    Email:"",
    Password:""
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
      BACKEND_DOMAIN+'/api/auth/login',
      inputs
    ).then((response)=>{
      console.log(response)
      localStorage.setItem("token",response.data.token);
      Navigate("/", {replace: true})
      window.location.reload();
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
        <h1>sginin</h1>
        <label>
          <div>
          Email:
          </div>
          <input type="text" placeholder="Email" name='Email' onChange={handleChange}/>
        </label>
        <label>
          <div>
          Password:
          </div>
          <input type="password" style={{"marginBottom":"10px"}} placeholder="Password" name='Password' onChange={handleChange}/>
        </label>
        <Link to="/forgetpassword"  style={{"color":"#3f51b5","display":"block","marginBottom":"10px","textAlign":"left"}}>
          Forget Password
        </Link>
        <Link to="/Resendemailverification"  style={{"color":"#3f51b5","display":"block","marginBottom":"10px","textAlign":"left"}}>
          Resend Email Verification
        </Link>
        <button onClick={submithandler}>sginin</button>
        <Link to="/register"  style={{"color":"#3f51b5","marginTop":"10px","display":"inline-block"}}>
          sginup
        </Link>
       
      </div>
      
    </form>
    </>
  )
}
