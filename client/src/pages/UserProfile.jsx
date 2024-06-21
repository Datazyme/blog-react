import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setconfirmNewPassword] = useState('')
  const [error, setError] = useState('');

  const [isAvatarTouched, setIsAvatarTouched] = useState(false)

  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  //redirect not logged in users to login page
  useEffect (() => {
    if(!token) {
      navigate('/login')
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      const {name, email, avatar} = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
    getUser();
  }, [])

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, 
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      setAvatar(response?.data.avatar)
    } catch (err) {
      console.log(err)
    }
  }

  const updateUserDetails = async (e) => {
    e.preventDefault();

    try {
      //matches editUser in userControllers
      const userData =  new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('password', password);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);

      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, 
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 200) {
        navigate('/logout')
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }


  return (
    <section className='profile'>
      <div className='container profile__container'>
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My Posts</Link>
        <div className='profile__details'>
          <div className='avatar__wrapper'>
            <div className='profile__avatar'>
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt=""></img>
            </div>
            {/* Form to update avatar */}
            <form className='avatar__form'>
              <input type='file' name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept="png, jpg, jpeg"></input>
              <label htmlFor='avatar' onClick={() => setIsAvatarTouched(true)}><FaEdit></FaEdit></label>
            </form>
            {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler}><FaCheck></FaCheck></button>}
          </div>
          <h1>{currentUser.name}</h1>

          {/* form to update user details */}
          <form className='form profile__form' onSubmit={updateUserDetails}>
            {error && <p className='form__error-message'>{error}</p>}
            <input 
              type='text' 
              placeholder='Full Name'
              value={name}
              onChange={e => setName(e.target.value)}>
            </input>
            <input 
              type='email' 
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}>
            </input>
            <input 
              type='password' 
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}>
            </input>
            <input 
              type='password' 
              placeholder='New Password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}>
            </input>
            <input 
              type='password' 
              placeholder='Confirm New Password'
              value={confirmNewPassword}
              onChange={e => setconfirmNewPassword(e.target.value)}>
            </input>
            <button type='submit' className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile