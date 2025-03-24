import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BACKEND_DOMAIN, MyContext } from "../tools"; 
import Swal from 'sweetalert2'
import "./SuccessPage.css"

export default function FailedPage() {
    const navigate = useNavigate(); 
  
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="success-page">
      <div>
        <h1>Payment Failed ❌</h1>
        <button onClick={goToHome}>Go to Home</button>
      </div>
    </div>
  );
};