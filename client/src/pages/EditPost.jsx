import React, { useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { UserContext } from '../context/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  
  const navigate = useNavigate();
  const {id} = useParams();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  //redirect not logged in users to login page
  useEffect (() => {
    if(!token) {
      navigate('/login')
    }
  }, []);
  
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
  ];

  const postCategories = ['Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Uncategorized', 'Weather']

  useEffect(() => {
    const getPost = async () => {
      //setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(response.data.title)
        //setCategory(response.data.category)
        setDescription(response.data.description)        
        //setThumbnail(response.data.thumbnail)
      } catch (err) {
        setError(err);
      }
      //setIsLoading(false)
    }
    getPost();
  }, []);

  // if(isLoading) {
  //   return <Loader />
  // };
  
  const editPost = async (e) => {
    e.preventDefault();


    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)
    
    try {
      //from index.js server which has /posts route that leads to postRoutes.js
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, 
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 200) {
        return navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Edit Post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form className='form create-post__form' onSubmit={editPost}>
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

export default EditPost;