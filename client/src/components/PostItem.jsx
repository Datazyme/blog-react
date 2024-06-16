import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import DOMPurify from "dompurify";

//where is postID coming from?
const PostItem = ({postID, category, title, description, creator, thumbnail, createdAt}) => {
  const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
  const postTitle = description.length > 30 ? title.substr(0, 30) + '...' : title;
  const sanitizer = DOMPurify.sanitize;

  return (
    <article className='post'>
      <div className='post__thumbnail'>
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title}></img>
      </div>
      <div className='post__content'>
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{__html: sanitizer(shortDescription)}}></p>
        <div className='post__footer'>
          <PostAuthor creator={creator} createdAt={createdAt}/>
          <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      </div>
    </article>
  )
}

export default PostItem