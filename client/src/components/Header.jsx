import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const  [isNavshowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  
  const closeNavHandler = () => {
    if(window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true)
    }   
  } 

  return (
   <nav>
    <div className='container nav__container'>
      <Link to="/" className='nav__logo' onClick={closeNavHandler}>
        <img src={logo} alt="Navbar Logo"></img>
      </Link>
      {isNavshowing && <ul className='nav__menu'>
        <li><Link to="/profile/asdfdf" onClick={closeNavHandler}>Ernest Achiever</Link></li>
        <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
        <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
        <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
      </ul>}
      <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavshowing)}>
        {isNavshowing ? <AiOutlineClose /> : <FaBars/>}
      </button>
    </div>
   </nav>
  )
}

export default Header