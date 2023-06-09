const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.get('/logout', AuthController.logoutUser)
router.get('/loggedIn', AuthController.getLoggedIn)
router.delete('/user/:id', AuthController.deleteUser)
router.put('/user/:id', AuthController.updateUser)
router.get('/role/:id', AuthController.getAdmin) 

module.exports = router