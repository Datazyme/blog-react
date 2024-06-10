import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PostAuthor = ({creator, createdAt}) => {
  const [author, setAuthor] = useState({})

  useEffect(() =>{
    const getAuthor  = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${creator}`);
        setAuthor(response?.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAuthor();
  }, []);

  return (
    <Link to={`/posts/users/${creator}`} className='post__author'>
        <div className='post__author-avatar'>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt=""></img>
        </div>
        <div className='post__author-details'>
            <h5>By: {author?.name}</h5>
            <small>{createdAt}</small>
        </div>
    </Link>
  )
}

export default PostAuthor