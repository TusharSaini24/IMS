const router = require('express').Router()
const authController = require('../controller/authController')

router.get('/', authController.login)

router.get('/dashboard', authController.dashboard)

router.post('/postLogin', authController.postLogin)


module.exports = router