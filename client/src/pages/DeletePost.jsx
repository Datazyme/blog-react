import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DeletePost = () => {
  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  //redirect not logged in users to login page
  useEffect (() => {
    if(!token) {
      navigate('/login')
    }
  }, [])
  return (
    <Link className='btn sm danger'>Delete</Link>
  )
}

export default DeletePost