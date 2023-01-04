const express = require('express')
const { signup, login } = require('../controllers/user')
const authenticationMiddleware = require('../middlewares/authenticate');

const router = express.Router()

router.post('/signup', authenticationMiddleware, signup)
router.post('/login', authenticationMiddleware, login)

module.exports = router