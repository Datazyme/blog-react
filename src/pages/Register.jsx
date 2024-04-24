import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordconfirm: ''
  })

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name] : e.target.value}
    })
  }

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className='form register__form'>
          <p className='form__error-message'>Error Message Register</p>
          <input 
            type='text' 
            placeholder='Full Name' 
            name='name' 
            value={userData.name} 
            onChange={changeInputHandler}>
          </input>
          <input 
            type='text' 
            placeholder='email' 
            name='email' 
            value={userData.email} 
            onChange={changeInputHandler}>
          </input>
          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            value={userData.password} 
            onChange={changeInputHandler}>
          </input>
          <input 
            type='password' 
            placeholder='Confirm Password' 
            name='passwordconfirm' 
            value={userData.passwordconfirm} 
            onChange={changeInputHandler}>
          </input>
          <button type='submit' className='btn primary'>Register</button>
        </form>
        <small>Already have an account?<Link to='/login'>sign in</Link>
        </small>
      </div>
    </section>
  )
}

export default Register