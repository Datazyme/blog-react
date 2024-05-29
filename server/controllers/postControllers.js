const Post = require('../models/postModel')
const User = require('../models/userModel')
const HttpError = require("../models/errorModel")
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')



/*============= Create Post ===============
Post: api/posts
Protected*/
const createPost = async (req, res, next) => {
    //res.json("Create Posts")
    try {
        let {title, body, category} = req.body;
        if(!title || !body || !category || !req.files) {
            return next(new HttpError('Fill in all fields, choose a thumbnail', 422))
        }

        //get thumbnail from request files
        const {thumbnail} = req.files;
        //check file size
        if(thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2mb."))
        }

        //uploads new thumbnail and prevents two thumbnails being named the same by different users
        //thumbnail.name has name in thumbnail object
        let fileName = thumbnail.name;
        //splits where dots are, adds random string before dot
        let splitFilename = fileName.split('.');
        let newFilename = splitFilename[0] + uuid() + '.' + splitFilename[splitFilename.length - 1]
        //uploads new thumbnail
        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if(err) {
                return next(new HttpError(err));
            }  else {
                //req.user.id comes from authmiddleware
                const newPost = await Post.create({
                    title, category, body, thumbnail: newFilename, creator: req.user.id});
                if(!newPost) {
                    return next(new HttpError('Post could not be changed', 422))
                }
                //increases post count for user by 1
                const currentUser = await User.findById(req.user.id);
                const userPostcount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostcount})
                res.status(201).json(newPost);
            }
        })
    } catch (error) {
        return next(new HttpError(error))
    }

}



/*============= Get Posts ===============
GET: api/posts
Unprotected*/
const getPosts = async (req, res, next) => {
    res.json("Get Posts")
}

/*============= Get Single Post ===============
GET: api/posts/:id
Unprotected*/
const getPost = async (req, res, next) => {
    res.json("Get Single Post")
}

/**============= Get Posts By Category ===============
GET: api/posts/categories/:category
Unprotected*/
const getCatPosts = async (req, res, next) => {
    res.json("Get Posts By Category")
}

/**============= Get Authors/Users Posts===============
GET: api/posts/users/:id
Unprotected*/
const getUserPosts = async (req, res, next) => {
    res.json("Get Authors Posts")
}

/**============= Edit Post ===============
Patch: api/posts/:id
Protected*/
const editPost = async (req, res, next) => {
    res.json("Edit Post")
}

/**============= Delete Post ===============
DELETE: api/posts/:id
Protected*/
const deletePost = async (req, res, next) => {
    res.json("Delete Post")
}

module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost};