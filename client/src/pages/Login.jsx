import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [userData, setUserData] = useState({   
    email: '',
    password: '',    
  })
  //use name in input below because that is how each input is
  //targeted by e.target.name
  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name] : e.target.value}
    })
  }

  return (
    <section className='login'>
      <div className='container'>
        <h2>Sign In</h2>
        <form className='form login__form'>
          <p className='form__error-message'>Error Message Login</p>
          <input 
            type='text' 
            placeholder='email' 
            name='email' 
            value={userData.email} 
            onChange={changeInputHandler}
            autoFocus>
          </input>
          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            value={userData.password} 
            onChange={changeInputHandler}>
          </input>

          <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Don't have an account?<Link to='/register'>Sign Up</Link>
        </small>
      </div>
    </section>
  )
}

export default Login