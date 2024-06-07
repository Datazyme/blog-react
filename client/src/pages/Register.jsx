import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//makes requests, Promise based HTTP client for the browser and node.js
import axios from 'axios'


const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordconfirm: ''
  })
  //To display in the error messages below, coming from Http error messages in userControlers
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //use name in input below because that is how each input is
  //targeted by e.target.name
  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name] : e.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      //axios.post because registerUser is post route in userRoutes.js
      //path matches what is in userRoutes.js
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
      const newUser = await response.data
      console.log(newUser);
      if(!newUser) {
        setError("Couldn't register user. Please try again")
      }
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className='form register__form' onSubmit={registerUser}>
          {error && <p className='form__error-message'>{error}</p>}
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