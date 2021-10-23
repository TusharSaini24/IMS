const router = require('express').Router()
const authController = require('../controller/authController')

const isAuth = require('../middleware/isAuth')

router.get('/', authController.login)

router.get('/logout', authController.logout)

router.get('/dashboard', isAuth,authController.dashboard)

router.post('/postLogin', authController.postLogin)


module.exports = router