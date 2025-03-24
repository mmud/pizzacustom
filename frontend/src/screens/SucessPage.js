import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { BACKEND_DOMAIN, MyContext } from "../tools"; 
import Swal from 'sweetalert2'
import "./SuccessPage.css"

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
    const { cart, setcart,cartincrement } = useContext(MyContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("id");

    const verifyPayment = async () => {
      try {
        const response = await Axios.post(
          `${BACKEND_DOMAIN}/api/order/success`,
          { orderId:orderId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setcart(0);
    } catch (e) {
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
    } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search]); 

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="success-page">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h1>Payment Success 🎉</h1>
          <button onClick={goToHome}>Go to Home</button>
        </div>
      )}
    </div>
  );
};