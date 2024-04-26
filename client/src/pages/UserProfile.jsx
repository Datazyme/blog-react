import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Avatar6 from '../images/avatar6.jpg'
import { FaEdit, FaCheck } from "react-icons/fa";

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  return (
    <section className='profile'>
      <div className='container profile__container'>
        <Link to={`/myposts/sdfsdf`} className='btn'>My Posts</Link>
        <div className='profile__details'>
          <div className='avatar__wrapper'>
            <div className='profile__avatar'>
              <img src={Avatar6} alt=""></img>
            </div>
            {/* Form to update avatar */}
            <form className='avatar__form'>
              <input type='file' name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept="png, jpg, jpeg"></input>
              <label htmlFor='avatar'><FaEdit></FaEdit></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck></FaCheck></button>
          </div>
          <h1>Red Baron</h1>
        </div>

      </div>
    </section>
  )
}

export default UserProfile