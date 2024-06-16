import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from "dompurify";
import axios from 'axios'

import Loader from '../components/Loader'
import DeletePost from './DeletePost'
import { UserContext } from '../context/userContext'


const PostDetail = () => {
  //useparams here can use id bc it is specified in router.get('/:id', getPost) in postRoutes
  //and in path: "posts/:id", element: <PostDetail></PostDetail> in index.js in client
  const {id} = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const sanitizer = DOMPurify.sanitize;
  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response.data)
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }
    getPost();
  }, []);

  if(isLoading) {
    return <Loader />
  };

  return (
    <section className='post_detail'>
      {error && <p className='error'>{error}</p>}
      {post && <div className='container post-detail__container'>
        <div className='post-detail__header'>
          <PostAuthor creator={post.creator} createdAt={post.createdAt}/>
          {currentUser?.id == post?.creator && <div className='post_detail__buttons'>
            <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
            <DeletePost postId={id}></DeletePost>
          </div>}
 
        </div>
        <h1>{post.title}</h1>
        <div className='post-detail__thumbnail'>
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" ></img>
        </div>
        <p dangerouslySetInnerHTML={{__html: sanitizer(post.description)}}></p>
      </div>}
    </section>
  )
}

export default PostDetail