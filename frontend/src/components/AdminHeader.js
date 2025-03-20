import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminHeader() {
  const nav = useRef(null)

  const barclick=()=>{
    if(nav.current.style.width =="300px")
      nav.current.style.width="70px"
    else
      nav.current.style.width="300px"

  }

  return (
    <div className='nav' ref={nav}>
      <ul>
        <li>
            <span className='bar'><i className="fa-solid fa-bars" onClick={barclick}></i></span>
        </li>
        <li>
          <NavLink end to="/admin">
            <span className='aicon'><i className="fa-solid fa-house"></i></span>
            <span className='title'>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/ing">
            <span className='aicon'><i className="fa-solid fa-seedling"></i></span>
            <span className='title'>ingreadients</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
