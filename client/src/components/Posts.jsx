import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import Loader from './Loader'
import axios from 'axios'
//import { DUMMY__POSTS } from '../data'


//where is postID coming from?
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          //from index.js server which has /posts route that leads to postRoutes.js
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
          setPosts(response?.data)

        } catch (err) {
          console.log(err)
        }
        setIsLoading(false)
      }
      fetchPosts();
    }, [])

    if(isLoading) {
      return <Loader />
    }
  
    //_id is the object ID used by mongoDb
  return (
    <section className='posts'>
        {posts.length > 0 ? <div className='container posts__container'>
        {
            posts.map(({_id: id, thumbnail, category, title, description, creator, createdAt}) => 
            <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
            description={description} creator={creator} createdAt={createdAt}></PostItem>)
        }
        </div> : <h2 className='center'>No posts found</h2>}
    </section>
  )
}

export default Posts