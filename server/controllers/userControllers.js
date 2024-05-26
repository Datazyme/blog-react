//*******control access to specified pages below */

//What’s the next doing here. It’s gonna skip the first middleware function if the condition is true and 
//invoke the next middleware function and you will have the "Hello Planet !!!!" response.
//So, next passes the control to the next function in the middleware stack.
//What if the first middleware function does not send back any response but do 
//execute a piece of logic and then you get the response back from second middleware function

const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const HttpError = require("../models/errorModel")
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')


//Register a new user
//Post to : api/users/register
//unprotected
const registerUser = async(req, res, next) => {
    //res.json('Register user')
    try {
        const {name, email, password, passwordconfirm} = req.body;
        //make sure below fields are empty
        if(!name || !email || !password) {
            return next(new HttpError('Fill in all fields', 422));
        }
        const newEmail = email.toLowerCase();

        //check to see if user exists
        const emailExists = await User.findOne({email: newEmail});
        if(emailExists) {
            return next(new HttpError("Email areldy exists.", 422));
        }

        //checks if password is more than 6 char
        if((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters", 422));
        }

        //check if passwords entered match
        if(password !== passwordconfirm) {
            return next(new HttpError("Passwords do not match.", 422));
        }

        //hashes password and saves user to database
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({name, email: newEmail, password: hashedPass});
        res.status(201).json(`New user ${newUser.email} registered.`);
    } catch (error) {
        return next(new HttpError('User registration failed.', 422))
    }
}

//Login registered user
//Post to : api/users/login
//unprotected

//JSON Web Tokens (JWTs) are a standardized way to securely send data 
//between two parties. They contain information (claims) encoded in the JSON format. 
//These claims help share specific details between the parties involved
const loginUser = async(req, res, next) => {
    //res.json('Login user')
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return next(new HttpError("Fill in all fields", 422));
        }
        const newEmail = email.toLowerCase();

        const user = await User.findOne({email: newEmail});
        if(!user) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) {
            return next(new HttpError("Invalid password", 422));
        }

        const{_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.status(200).json({token, id, name});
    } catch (error) {
        return next(new HttpError('Login failed. Check credentials', 422));
    }
}

//User Profile
//Post to : api/users/:id
//protected
//since getUser controller is only for the profile page, could use req.user to 
//get the current logged in user from code in authMiddleware
const getUser = async(req, res, next) => {
    //res.json('User profile')
    try {
        const {id} = req.params;
        //the negative in front of password excludes that path as otherwise it would be included
        //because id has the password field. used with .select and .exclude
        const user = await User.findById(id).select('-password');
        if(!user) {
            return next(new HttpError('User not found.', 404));
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new HttpError(error));
    }
}

//Change user avatar
//Post to : api/users/change-avatar
//protected
const changeAvatar = async(req, res, next) => {
    try {
        // res.json(req.files)
        // console.log(req.files)
        //checks to see if image was submitted
        if(!req.files.avatar) {
            return next(new HttpError("Please choose and image.", 422))
        }

        //find user from database, route is protected, authorization middleware only permits logged in users
        //has request.user which is object of current logged in user
        const user = await User.findById(req.user.id)
        //delete old avatar if exists
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
        }
        const {avatar} = req.files;
        //check file size
        if(avatar.size > 500000) {
            return next(new HttpError("Profile pictures too big. Should be less than 500kb", 422))
        }

        //uploads new avatar and prevents two avatars being named the same by different users
        //avatar.name has name in avatar object
        let fileName;
        fileName = avatar.name;
        //splits where dots are, adds random string before dot
        let splitFilename = fileName.split('.');
        let newFilename = splitFilename[0] + uuid() + '.' + splitFilename[splitFilename.length - 1]
        //uploads new avatar
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if(err) {
                return next(new HttpError(err));
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFilename}, {new: true});
            if(!updatedAvatar) {
                return next(new HttpError('Avatar could not be changed', 422))
            }
            res.status(200).json(updatedAvatar);
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}

//Edit user details
//Post to : api/users/edit-user
//protected
const editUser = async(req, res, next) => {
    res.json('Edit user details')
}

//Get users/authors
//Post to : api/users/authors
//unprotected
const getAuthors = async(req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors)
    } catch (error) {
        return next(new HttpError(error));
    }
}

module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors};