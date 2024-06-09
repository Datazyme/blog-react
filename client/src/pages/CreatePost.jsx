import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  //redirect not logged in users to login page
  useEffect (() => {
    if(!token) {
      navigate('/login')
    }
  }, [])

  const postCategories = ['Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather']
  
  //this is for ReactQuill which makes a dialog box that gives typing style options below in toolbar above textarea
  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false]}], 
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list' : 'ordered'}, {'list' : 'bullet'}, {'indent' : '-1'}, {'indent' : '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  //for ReactQuill typing styles to allow for the formats
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image'
  ]

  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Create Post</h2>
        <p className='form__error-message'>
          This is an error message create post
        </p>
        <form className='form create-post__form'>
          <input 
            type='text' 
            placeholder='Title' 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            autoFocus>
          </input>
          <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
            {
              postCategories.map(cat => <option key={cat}>{cat}</option>)
            }
            </select>
            <ReactQuill 
              modules={modules} 
              formats={formats} 
              value={description}
              onChange={setDescription}>
              </ReactQuill>
            <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'></input>
            <button type='submit' className='btn primary'>Update</button>
          
        </form>
      </div>

    </section>
  )
}

export default CreatePost