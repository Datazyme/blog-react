//*******control access to specified pages below */

//What’s the next doing here. It’s gonna skip the first middleware function if the condition is true and 
//invoke the next middleware function and you will have the "Hello Planet !!!!" response.
//So, next passes the control to the next function in the middleware stack.
//What if the first middleware function does not send back any response but do 
//execute a piece of logic and then you get the response back from second middleware function

const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const HttpError = require("../models/errorModel")

//Register a new user
//Post to : api/users/register
//unprotected
const registerUser = async(req, res, next) => {
    //res.json('Register user')
    try {
        const {name, email, password, passwordconfirm} = req.body;
        //make sure below fields are empty
        if(!name || !email || !password) {
            return next(new HttpError('Fill in all fields', 422))
        }
        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({email: newEmail})
        if(emailExists) {
            return next(new HttpError("Email areldy exists.", 422))
        }

        if((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters", 422))
        }

        if(password !== passwordconfirm) {
            return next(new HttpError("Passwords do not match.", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({name, email: newEmail, password: hashedPass})
        res.status(201).json(`New user ${newUser.email} registered.`)
    } catch (error) {
        return next(new HttpError('User registration failed.', 422))
    }
}

//Login registered user
//Post to : api/users/login
//unprotected
const loginUser = async(req, res, next) => {
    res.json('Login user')
}

//User Profile
//Post to : api/users/:id
//protected
const getUser = async(req, res, next) => {
    res.json('User profile')
}

//Change user avatar
//Post to : api/users/change-avatar
//protected
const changeAvatar = async(req, res, next) => {
    res.json('Change avatar')
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
    res.json('Get all users/authors')
}

module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors};