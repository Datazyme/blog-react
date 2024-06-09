import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('')
  const navigate = useNavigate()

  //from userContext.js, sets token, id, name to locals storage for use in all pages. 
  const {setCurrentUser} = useContext(UserContext);

  //use name in input below because that is how each input is
  //targeted by e.target.name
  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name] : e.target.value}
    })
  }

  //comes from loginUser inside userControllers.js, gets error messages from there
  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      //if user is already logged in gets info from userControllers.js 
      // where res.status gets token, id, name
      //gets sent to userContext where userProvider sets currentUser saves in localstorage
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className='login'>
      <div className='container'>
        <h2>Sign In</h2>
        <form className='form login__form' onSubmit={loginUser}>
          {error && <p className='form__error-message'>{error}</p>}
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