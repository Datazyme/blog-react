import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import thumbnail1 from '../images/blog1.jpg'

const PostDetail = () => {
  return (
    <section className='post_detail'>
      <div className='container post-detail__container'>
        <div className='post-detail__header'>
          <PostAuthor />
          <div className='post_detail__buttons'>
            <Link to={'.posts/werwer/edit'} className='btn sm primary'>Edit</Link>
            <Link to={'.posts/werwer/delete'} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className='post-detail__thumbnail'>
          <img src={thumbnail1} alt="" ></img>
        </div>
        <p>Monkey is a common name that may refer to most mammals of the infraorder 
          Simiiformes, also known as the simians. Traditionally, all animals in the group
          now known as simians are counted as monkeys except the apes. 
          Thus monkeys, in that sense, constitute an incomplete paraphyletic grouping; 
          however, in the broader sense based on cladistics, apes (Hominoidea) are also 
          included, making the terms monkeys and simians synonyms in regard to their scope.
        </p>
        <p>
          Monkey is a common name that may refer to most mammals of the infraorder 
          Simiiformes, also known as the simians. Traditionally, all animals in the group
          now known as simians are counted as monkeys except the apes. 
          Thus monkeys, in that sense, constitute an incomplete paraphyletic grouping; 
          however, in the broader sense based on cladistics, apes (Hominoidea) are also 
          included, making the terms monkeys and simians synonyms in regard to their scope.
        </p>
        <p>
          Monkey is a common name that may refer to most mammals of the infraorder 
          Simiiformes, also known as the simians. Traditionally, all animals in the group
          now known as simians are counted as monkeys except the apes. 
          Thus monkeys, in that sense, constitute an incomplete paraphyletic grouping; 
          however, in the broader sense based on cladistics, apes (Hominoidea) are also 
          included, making the terms monkeys and simians synonyms in regard to their scope.
        </p>
      </div>
    </section>
  )
}

export default PostDetail