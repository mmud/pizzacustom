import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import "./admin.css"
import  Axios  from 'axios'
import { BACKEND_DOMAIN } from '../tools'
import Swal from 'sweetalert2'
import LoadingSpinnerunvis from '../components/LoadingSpinnerunvis'
import LoadingSpinner from '../components/LoadingSpinner'
import defaultavatar from "../images/avatar.jpg"

export default function Admining() {

  const addpanel = useRef(null)
  const overlay = useRef(null)

  const [inputs,setInputs] = useState({
    Name:""
  })

  const [loading, setloading] = useState(true);
  const [loadingcode, setloadingcode] = useState(true);

  const handleChange=(e)=>{
    setInputs((prev)=>({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }


  // random string => (Math.random() + 1).toString(36).substring(7)+(Math.random() + 1).toString(36).substring(7)
  const codeinput = useRef(null)
    //avatar
    const errormsg=(errormsg)=>{
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
          title: errormsg
        })
    }

    function base64(file, callback){
      var coolFile = {};
      function readerOnload(e){
        var base64 = btoa(e.target.result);
        coolFile.base64 = base64;
        callback(coolFile)
      };
    
      var reader = new FileReader();
      reader.onload = readerOnload;
    
      coolFile.filetype = file.type;
      coolFile.size = file.size;
      coolFile.filename = file.name;
      reader.readAsBinaryString(file);
    }

    const [avatar, setavatar] = useState(null);
    const [avatar2, setavatar2] = useState(null);
      const img = useRef(null);
      const img2 = useRef(null);
      const avatarchange=(e)=>{
        let file = e.target.files[0]
    
        if(!file)
        {
            errormsg("image not exist");
            return;
        }
    
        if(file.type !=="image/jpg" && file.type !=="image/jpeg" && file.type !=="image/png")
        {
            errormsg("image format is oncorrect");
            return;
        }
    
        if(file.size>1024*1024*5)
        {
            errormsg("the largest image size is 5mb");
            return;
        }
      
        base64( file, function(data){
            setavatar("data:image/*;base64,"+data.base64)
          })
            
      }

      const avatar2change=(e)=>{
        let file = e.target.files[0]
    
        if(!file)
        {
            errormsg("image not exist");
            return;
        }
    
        if(file.type !=="image/jpg" && file.type !=="image/jpeg" && file.type !=="image/png")
        {
            errormsg("image format is oncorrect");
            return;
        }
    
        if(file.size>1024*1024*5)
        {
            errormsg("the largest image size is 5mb");
            return;
        }
    
        base64( file, function(data){
            setavatar2("data:image/*;base64,"+data.base64)
          })
            
      }

  const logout=()=>{
    localStorage.setItem("token",null);
    Navigate("/", {replace: true})
    window.location.reload();
  }

  const submithandler=(e)=>{
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };

    setloadingcode(false);
    Axios.post( 
      BACKEND_DOMAIN+'/api/ing',
      {...inputs,Imgbig:avatar,Imgsmall:avatar2},
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
      
      Toast.fire({
        icon: 'success',
        title: "تمت العمليه بنجاح"
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
      BACKEND_DOMAIN+`/api/ing?num=${num}&type=${selectinput.current.value}&s=${searchinput.current.value}`,
      config
    ).then((response)=>{
      setloading(true);
      setqs(response.data);

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
  

  //delete code
  const deletecode=async(_id)=>{

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
     };

    const inputs={_id:_id};
    setloading(false);
    Axios.post( 
      BACKEND_DOMAIN+`/api/ing/delete`,
      inputs,
      config
    ).then((response)=>{
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
        icon: 'success',
        title: "تمت العمليه بنجاح"
      })

      setrefresh(refresh+1);

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

  //edit code
  const editpanel = useRef(null);
  const nameedit = useRef(null);
  const leveledit = useRef(null);
  const priceedit = useRef(null);
  const editcode=async(_id,Name,Level,Imgbig,Price,Imgsmall)=>{
      setInputs2((prev)=>({
        _id:_id,
        Name:Name,
        Level:Level,
        Price:Price
      }))
      nameedit.current.value=Name;
      leveledit.current.value=Level;
      priceedit.current.value=Price;
      img.current.src=BACKEND_DOMAIN+Imgbig;
      img2.current.src=BACKEND_DOMAIN+Imgsmall;
      setavatar(BACKEND_DOMAIN+Imgbig);
      setavatar2(BACKEND_DOMAIN+Imgsmall);
      overlay.current.style.display="block";
      editpanel.current.style.display="block";
    }

    const [inputs2,setInputs2] = useState({
      Name:"",
      
      })

     const handleChange2=(e)=>{
      setInputs2((prev)=>({
          ...prev,
          [e.target.name]: e.target.value
      }))
    }


    // random string => (Math.random() + 1).toString(36).substring(7)+(Math.random() + 1).toString(36).substring(7)
    // const randomstring2=()=>{
    //   var random = (Math.random() + 1).toString(36).substring(7)+(Math.random() + 1).toString(36).substring(7);
    //   nameedit.current.value=random;
    //   setInputs((prev)=>({
    //     ...prev,
    //     Token: random
    // }));
    // }

    const submithandler2=(e)=>{
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       };
  
      setloadingcode(false);
      Axios.post( 
        BACKEND_DOMAIN+'/api/ing/edit',
        {...inputs2,Imgbig:avatar.replace(BACKEND_DOMAIN, ""),Imgsmall:avatar2.replace(BACKEND_DOMAIN, "")},
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
        
        Toast.fire({
          icon: 'success',
          title: "تمت العمليه بنجاح"
        })
        setrefresh(refresh+1);
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
  

      //search
      const searchinput = useRef(null)
      const selectinput = useRef(null)
  
      const searchclick=(e)=>{
        e.preventDefault();
        setrefresh(refresh+1);
  
      }

  return (
    <>
    {!loading?<LoadingSpinner/>:""}
    <div className="admincont admin">
      <AdminHeader/>
      <div className='commands'>

      <div className='search'>
          <form onSubmit={searchclick}> 
          <input type="text" placeholder="search" ref={searchinput} name='search'/>
          <select  name="type" ref={selectinput} >
              <option value="Name">Name</option>
          </select>
          <button  type="submit" ><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>


        <div className='toright'>
          <button onClick={()=>{addpanel.current.style.display="block";overlay.current.style.display="block"}}>add</button>
        </div>
        <table>
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Level</th>
                  <th>Big image</th>
                  <th>Small image</th>
                  <th style={{"width":"100px"}}></th>
                </tr>
            </thead>
            <tbody>
                

                {qs.map((code,i)=>{
                  return(<tr >
                          <td>{code.Name}</td>
                          <td>{code.Price}</td>
                          <td>{code.Level}</td>
                          <td><img src={BACKEND_DOMAIN+code.Imgbig} className='q' alt="teacherimg" style={{"width":"100px"}}/></td>
                          <td><img src={BACKEND_DOMAIN+code.Imgsmall} className='q' alt="teacherimg" style={{"width":"100px"}}/></td>
                          
                          <td>  
                            <i className="fa-solid fa-pen" onClick={()=>editcode(code._id,code.Name,code.Level,code.Imgbig,code.Price,code.Imgsmall)}></i>
                            <i className="fa-solid fa-trash" onClick={()=>deletecode(code._id)}></i>
                          </td>
                        </tr>)
                })}
            </tbody>
        </table>


        <div className='spacebtween'>
          <button onClick={()=>{
            if(qs.length>=10)
            setnum(num+1);
            }}>Next</button>
          <button onClick={()=>{            
            if(num>1)
              setnum(num-1);
              }}>Back</button>
        </div>


        <div className='overlay unvis' ref={overlay}></div>
        {!loadingcode?<LoadingSpinnerunvis/>:""}
        <div className='add' ref={addpanel}>
          <div className='toright'>
            <span className='xicon' style={{"fontSize":"80px"}} onClick={()=>{addpanel.current.style.display="none";overlay.current.style.display="none"}}>
              ×
            </span>
          </div>

          <div className='imguploader'>
            <h3 style={{"textAlign":"center","marginBottom":"20px"}}>Big Image</h3>
            <div style={{"position":"relative","display":"flex","justifyContent":"center"}}>
                <input type="file" onChange={avatarchange} id="upload1" name='Qimg' accept='image/*' hidden/>
                <label htmlFor="upload1" className='uploadbtn'><i className="fa-solid fa-camera"></i></label>
                <img src={avatar==null?defaultavatar:avatar} className='q' ref={img} alt="avatar"/>
            </div>
          </div>

          <label>
            <div>
            Name
            </div>
            <div style={{"display":"flex","alignItems":"center"}}>
              <input type="text" placeholder="name" name='Name' onChange={handleChange}/>
            </div>
          </label>

          <label>
            <div>
            Price
            </div>
            <div style={{"display":"flex","alignItems":"center"}}>
              <input type="text" placeholder="price" name='Price' onChange={handleChange}/>
            </div>
          </label>

          
          <label>
            <div>
             Level
            </div>
            <div style={{"display":"flex","alignItems":"center"}}>
              <input type="text" placeholder="level" name='Level' onChange={handleChange}/>
            </div>
          </label>
  
          

          <div className='imguploader'>
            <h3 style={{"textAlign":"center","marginBottom":"20px"}}>Small Image </h3>
            <div style={{"position":"relative","display":"flex","justifyContent":"center"}}>
                <input type="file" onChange={avatar2change} id="upload2" name='Qimg' accept='image/*' hidden/>
                <label htmlFor="upload2" className='uploadbtn'><i className="fa-solid fa-camera"></i></label>
                <img src={avatar2==null?defaultavatar:avatar2} className='q' ref={img2} alt="avatar"/>
            </div>
          </div>

          <button onClick={submithandler}>Submit</button>
        </div>


        <div className='add' ref={editpanel}>
          <div className='toright'>
            <span className='xicon' style={{"fontSize":"80px"}} onClick={()=>{editpanel.current.style.display="none";overlay.current.style.display="none"}}>
              ×
            </span>
          </div>

          <div className='imguploader'>
            <h3 style={{"textAlign":"center","marginBottom":"20px"}}>Big Image</h3>
            <div style={{"position":"relative","display":"flex","justifyContent":"center"}}>
                <input type="file" onChange={avatarchange} id="upload3" name='avatar' accept='image/*' hidden/>
                <label htmlFor="upload3" className='uploadbtn'><i className="fa-solid fa-camera"></i></label>
                <img src={avatar==null?defaultavatar:avatar} className='q' ref={img} alt="avatar"/>
            </div>
          </div>

          <label>
            <div>
            Name
            </div>
            <div style={{"display":"flex","alignItems":"center"}}>
              <input ref={nameedit} type="text" placeholder="name" name='Name' onChange={handleChange2}/>
            </div>
          </label>


          <label>
            <div>
            Price
            </div>
            <div style={{"display":"flex","alignItems":"center"}}>
              <input ref={priceedit} type="text" placeholder="price" name='Price' onChange={handleChange2}/>
            </div>
          </label>

          
          <label>
            <div>
            Level
            </div>
            <div style={{"display":"flex","alignItems":"center"}}>
              <input ref={leveledit} type="text" placeholder="level" name='Level' onChange={handleChange2}/>
            </div>
          </label>

          <div className='imguploader'>
            <h3 style={{"textAlign":"center","marginBottom":"20px"}}>Small Image</h3>
            <div style={{"position":"relative","display":"flex","justifyContent":"center"}}>
                <input type="file" onChange={avatar2change} id="upload4" name='avatar' accept='image/*' hidden/>
                <label htmlFor="upload4" className='uploadbtn'><i className="fa-solid fa-camera"></i></label>
                <img src={avatar2==null?defaultavatar:avatar2} className='q' ref={img2} alt="avatar"/>
            </div>
          </div>

          <button onClick={submithandler2}>Submit</button>
        </div>

      </div>
    </div>
    </>
  )
}
