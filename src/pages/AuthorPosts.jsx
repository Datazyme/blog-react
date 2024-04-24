import React from 'react'
import { useState } from 'react'
import { DUMMY__POSTS } from '../data'
import PostItem from '../components/PostItem'

const AuthorPosts = () => {
  const [posts, setPosts] = useState(DUMMY__POSTS)
  return (
    <section className='posts'>
      {posts.length > 0 ? <div className='container posts__container'>
        {
          posts.map(({id, thumbnail, category, title, description, authorID}) => 
          <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
          description={description} authorID={authorID}></PostItem>)
        }
      </div> : <h2 className='center'>No posts found</h2>}
    </section>
  )
}

export default AuthorPosts