const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/userController')

router.get('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
