import React, { useEffect, useState } from 'react'
import Axios from "axios"
import LoadingSpinner from '../components/LoadingSpinner'
import { BACKEND_DOMAIN } from '../tools'

export default function Profile() {
  const [loading, setloading] = useState(null)
  const [userdata, setuserdata] = useState(null)

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };
  
  Axios.get( 
    BACKEND_DOMAIN+'/api/auth/getme',
    config
  ).then((response)=>{
    console.log(response);
    setuserdata(response.data);
    setloading(true);
  }).catch((e)=>{
    if(e.response.data === "not authorized")
      {
        localStorage.setItem("token",null);
      }
  });  
  }, [])
  if(loading==null)
  {
    return <LoadingSpinner/>
  }
  else{
  return (
    <div className="main">
      name:{userdata?.UserName} <br />
      email:{userdata?.Email} <br />
      role:{userdata?.Role}  <br />
    </div>
  )
  }
}
