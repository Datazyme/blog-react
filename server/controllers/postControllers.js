const Post = require('../models/postModel')
const User = require('../models/userModel')
const HttpError = require("../models/errorModel")
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')
const httpError = require('../models/errorModel')



/*============= Create Post ===============
Post: api/posts
Protected*/
const createPost = async (req, res, next) => {
    //res.json("Create Posts")
    try {
        let {title, description, category} = req.body;
        if(!title || !description || !category || !req.files) {
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
                    title, category, description, thumbnail: newFilename, creator: req.user.id});
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
    try {
        const posts = await Post.find().sort({updatedAt: -1});
        if(!posts) {
            return next(new HttpError('Post not found.', 404));
        }
        res.status(200).json(posts)
    } catch {
        return next(new HttpError(error))
    }
}

/*============= Get Single Post ===============
GET: api/posts/:id
Unprotected*/
const getPost = async (req, res, next) => {
    try {
        //const id = req.params.id" (or "const {id} = req.params" is the same)
        const postID = req.params.id
        const post = await Post.findById(postID);
        if(!post) {
            return next(new HttpError('Post not found.', 404));
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError('No post found', 404))
    }
    

}

/**============= Get Posts By Category ===============
GET: api/posts/categories/:category
Unprotected*/
const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;       
        const catPosts = await Post.find({category}).sort({createdAt: -1});
        if(!catPosts) {
            return next(new HttpError('No posts found.', 404));
        }
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}

/**============= Get Authors/Users Posts===============
GET: api/posts/users/:id
Unprotected*/
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const userPosts = await Post.find({creator: id}).sort({createdAt: -1});
        res.status(200).json(userPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}

/**============= Edit Post ===============
Patch: api/posts/:id
Protected*/
const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFilename;
        let updatedPost;
        const postId = req.params.id;
        let {title, category, description} = req.body;

        //ReactQuill has a paragraph opening and closing tag with a break tag in between
        //so there are 11 characters already taken
        if(!title || !category || description.length < 12) {
            return next(new httpError("Fill in all fields", 422))
        }
        // get old posts from database
        const oldPost = await Post.findById(postId);
        //check if post belongs to signed in author
        if (req.user.id == oldPost.creator) {
            //update post without updating thumbnail
            if(!req.files) {
                updatedPost = await Post.findByIdAndUpdate
                (postId, {title, category, description}, {new: true});
            } else {
                //for updating thumbnail get old post from database
                //delete old thumbnail from upload
                fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                    if(err) {
                        return next(new HttpError(err))
                    }            
                })
                //upload new thumbnail
                const {thumbnail} = req.files;
                //check file size 
                if(thumbnail.size > 2000000) {
                    return next(new HttpError('Thumbnail too big. Should be less than 2mb'))
                }
                fileName = thumbnail.name;
                let splitFilename = fileName.split('.');
                newFilename = splitFilename[0] + uuid() + '.' + splitFilename[splitFilename.length - 1];
                thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                    if(err) {
                        return next(new HttpError(err))
                    }
                })
                updatedPost = await Post.findByIdAndUpdate(postId, {title, category, 
                    description, thumbnail: newFilename}, {new: true});
            }
        }

        if(!updatedPost) {
            return next(new HttpError("Could not update post", 400))
        }
        
        res.status(200).json(updatedPost)

    } catch (error) {
        return next(new HttpError(error))
    }
}

/**============= Delete Post ===============
DELETE: api/posts/:id
Protected*/
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        if(!postId) {
            return next(new HttpError("Post unavailable", 400))
        }     
        const post = await Post.findById(postId);
        //?. is a optional chaining operator: enables you to read the value of a property 
        //located deep within a chain of connected objects without having to check that each reference in the chain is valid.
        /*shorter and simpler expressions when accessing chained properties when the possibility 
        exists that a reference may be missing. It can also be helpful while exploring the 
        content of an object when there's no known guarantee as to which properties are required.*/
        //in this case we ask does the "post" object with all keys exists, if not return undefined
        const fileName = post?.thumbnail;
        if(req.user.id == post.creator) {
            //have to delete thumbnail first then post from database
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if(err) {
                    return next(new HttpError(err))
                } else {
                    await Post.findByIdAndDelete(postId);
                    //find user and reduce post count by 1
                    const currentUser = await User.findById(req.user.id);
                    const userPostcount = currentUser?.posts - 1;
                    await User.findByIdAndUpdate(req.user.id, {posts: userPostcount})
                    res.json(`Post ${postId} deleted successfully.`);               
                }
            })
        } else {
            return next(new HttpError("Could not delete post", 403))
        }

    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost};