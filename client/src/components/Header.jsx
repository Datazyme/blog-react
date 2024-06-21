import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

//to allow only logged in users to see certain pages
import { UserContext } from '../context/userContext';

const Header = () => {
  const  [isNavshowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const {currentUser} = useContext(UserContext)
  
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
      {currentUser?.id && isNavshowing && <ul className='nav__menu'>
        <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser?.name}</Link></li>
        <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
        <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
        <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
      </ul>}
      {!currentUser?.id && isNavshowing && <ul className='nav__menu'>
        <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
        <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
      </ul>}
      <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavshowing)}>
        {isNavshowing ? <AiOutlineClose /> : <FaBars/>}
      </button>
    </div>
   </nav>
  )
}

export default Header