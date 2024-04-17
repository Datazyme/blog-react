import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from'./pages/Home';
import PostDetail from'./pages/PostDetail';
import Register from'./pages/Register';
import Login from'./pages/Login';
import UserProfile from'./pages/UserProfile';
import Authors from'./pages/Authors';
import CreatePost from'./pages/CreatePost';
import EditPost from'./pages/EditPost';
import CategoryPosts from'./pages/CategoryPosts';
import AuthorPosts from'./pages/AuthorPosts';
import Dashboard from'./pages/Dashboard';
import Logout from'./pages/Logout';


//createBrowserRouter coming from react-dom
//can use any name for const below but must call it in RouterProvider with router=with same name
const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    //children are the files in pages folder with each file having its own path
    //have to import each file and give each one a path name. All of these are then
    //called in <Outlet> in Layout.jsx
    children: [
      {index: true, element: <Home></Home>},
      {path: "posts/:id", element: <PostDetail></PostDetail>},
      {path: "register", element: <Register></Register>},
      {path: "login", element: <Login></Login>},
      {path: "profile/:id", element: <UserProfile></UserProfile>},
      {path: "authors", element: <Authors></Authors>},
      {path: "create", element: <CreatePost></CreatePost>},
      {path: "posts/:id/edit", element: <EditPost></EditPost>},
      {path: "posts/categories/:category", element: <CategoryPosts></CategoryPosts>},
      {path: "posts/users/:id", element: <AuthorPosts></AuthorPosts>},
      {path: "myposts/:id", element: <Dashboard></Dashboard>},
      {path: "logout", element: <Logout></Logout>},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

