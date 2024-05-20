const { Router } = require('express')

//PATCH is a method of modifying resources where the client sends 
//partial data that is to be updated without modifying the entire data.

const {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors} = require("../controllers/userControllers")

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getAuthors)
router.post('/change-avatar', changeAvatar)
router.patch('/edit-user', editUser)

module.exports = router