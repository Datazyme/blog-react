const { Router } = require('express')

//PATCH is a method of modifying resources where the client sends 
//partial data that is to be updated without modifying the entire data.

const {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors} = require("../controllers/userControllers.js")
const authMiddleware = require('../middleware/authMiddleware.js')
const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getAuthors)
router.post('/change-avatar', authMiddleware, changeAvatar)
router.patch('/edit-user', authMiddleware, editUser)

module.exports = router