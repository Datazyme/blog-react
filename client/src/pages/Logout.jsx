import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

//set current user to null
//useEffect in userContext.js function sets user in localstorage to null
const Logout = () => {
  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    setCurrentUser(null)
    navigate('/login')
  })
  
  return (
    <></>
  )
}

export default Logout