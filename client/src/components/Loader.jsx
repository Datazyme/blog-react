import React from 'react'
import logo from '../images/logo.png'

const Loader = () => {
  return (
    <div className='loader'>
        <div className='loader__image'>
            <img src={logo} alt=""></img>
        </div>
    </div>
  )
}

export default Loader