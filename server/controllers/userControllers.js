//*******control access to specified pages below */

//Register a new user
//Post to : api/users/register
//unprotected
const registerUser = (req, res, next) => {
    res.json('Register User')
}

//Login registered user
//Post to : api/users/login
//unprotected
const loginUser = (req, res, next) => {
    res.json('Register User')
}

//User Profile
//Post to : api/users/:id
//protected
const getUser = (req, res, next) => {
    res.json('User Profile')
}

//Change user avatar
//Post to : api/users/change-avatar
//protected
const changeAvatar = (req, res, next) => {
    res.json('Register User')
}

//Edit user details
//Post to : api/users/edit-user
//protected
const editUser = (req, res, next) => {
    res.json('Register User')
}

//Get users/authors
//Post to : api/users/authors
//unprotected
const getAuthors = (req, res, next) => {
    res.json('Register User')
}

module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}