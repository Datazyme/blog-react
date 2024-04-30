import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar6.jpg'
import { FaEdit, FaCheck } from "react-icons/fa";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setconfirmNewPassword] = useState('')
  


  return (
    <section className='profile'>
      <div className='container profile__container'>
        <Link to={`/myposts/sdfsdf`} className='btn'>My Posts</Link>
        <div className='profile__details'>
          <div className='avatar__wrapper'>
            <div className='profile__avatar'>
              <img src={avatar} alt=""></img>
            </div>
            {/* Form to update avatar */}
            <form className='avatar__form'>
              <input type='file' name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept="png, jpg, jpeg"></input>
              <label htmlFor='avatar'><FaEdit></FaEdit></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck></FaCheck></button>
          </div>
          <h1>Red Baron</h1>

          {/* form to update user details */}
          <form className='form profile__form'>
            <p className='form__error-message'>This is an error message</p>
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