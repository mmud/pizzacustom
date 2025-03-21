import { useEffect,useState } from 'react';
import './App.css';
import {BrowserRouter , Route,Routes,Navigate,useNavigate } from "react-router-dom";
import Header from './components/Header.js';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Login from './screens/Login';
import LoadingSpinner from './components/LoadingSpinner';
import Admin from './screens/Admin';
import Axios from "axios"
import Error404 from './screens/Error404';
import { parseJwt,BACKEND_DOMAIN,MyContext } from './tools';
import Soon from './screens/Soon';
import Verifyemail from './screens/Verifyemail';
import Resendemailverification from './screens/Resendemailverification';
import Resendpassowrdreset from './screens/Resendpassowrdreset';
import ResetPassword from './screens/ResetPassword';
import Admining from './screens/Admining.js';
import Order from './screens/Order.js';
import Myorders from './screens/Myorders.js';
import CartPage from './screens/CartPage.js';

function App() {
  const [islogedin, setislogedin] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [cart, setcart] = useState(0);
  const cartincrement = () => {
    setcart(prevCount => prevCount + 1);
  };
  const cartdecrement = () => {
    setcart(prevCount => prevCount - 1);
  };
  useEffect(() => {
    Axios.get( 
      BACKEND_DOMAIN+'/api/auth/isloggedin',
      {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
    ).then(response=>{
      if(response.data == "not authorized")
      {
        setislogedin(false);
        localStorage.setItem("token",null);
      }
      else if (response.data == "logedin")
      {
        setislogedin(true);
      }
      setloaded(true);
    }).catch(e=>{
      if(e.response.data === "not authorized")
      {
        setislogedin(false);
        localStorage.setItem("token",null);
      }
      else if (e.response.data === "logedin")
      {
        setislogedin(true);
      }
      setloaded(true);
    })
  }, [])

  return (
    <MyContext.Provider value={{ cart, setcart,cartincrement,cartdecrement }}>
    <BrowserRouter>
      {
        loaded?
        islogedin?
        <>
          <Header/>
          <Routes>
            <Route path="*" exact element={<Error404/>} />
            <Route path="/" exact element={<Home/>} />
            <Route path="/Error404" exact element={<Error404/>} />
            <Route path="/soon" exact element={<Soon/>} />
            <Route path="/profile" exact element={islogedin?<Profile/>:<Navigate to="/login" replace={true}/>}/>
            <Route path="/order" exact element={islogedin?<Order/>:<Navigate to="/login" replace={true}/>}/>
            <Route path="/myorders" exact element={islogedin?<Myorders/>:<Navigate to="/login" replace={true}/>}/>
            <Route path="/cart" exact element={islogedin?<CartPage/>:<Navigate to="/login" replace={true}/>}/>
            <Route path="/admin" exact element={islogedin&&parseJwt(localStorage.getItem("token"))?.role==="admin"?<Admin/>:<Error404/>} />
            <Route path="/admin/ing" exact element={islogedin&&parseJwt(localStorage.getItem("token"))?.role==="admin"?<Admining/>:<Error404/>} />
            <Route path="/register" exact element={!islogedin?<Register/>:<Navigate to="/" replace={true}/>} />
            <Route path="/login" exact element={!islogedin?<Login/>:<Navigate to="/" replace={true}/>} />
          </Routes>
        </>
      :
      <>
      <Header/>

      <Routes>
        <Route path="*" exact element={<Error404/>} />
        <Route path="/" exact element={<Home/>} />
        <Route path="/soon" exact element={<Soon/>} />
        <Route path="/register" exact element={!islogedin?<Register/>:<Navigate to="/" replace={true}/>} />
        <Route path="/login" exact element={!islogedin?<Login/>:<Navigate to="/" replace={true}/>} />
        <Route path="/order" exact element={<Navigate to="/login" replace={true}/>} />
        <Route path="/users/:id/verify/:token" exact element={<Verifyemail/>} />
        <Route path="/Resendemailverification" exact element={<Resendemailverification/>} />
        <Route path="/forgetpassword" exact element={<Resendpassowrdreset/>} />
        <Route path="/resetpassword/:token" exact element={<ResetPassword/>} />
      </Routes>
      </>
      :
      <LoadingSpinner/>
    }
    </BrowserRouter>
    </MyContext.Provider>

  );
}

export default App;