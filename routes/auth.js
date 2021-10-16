const router = require('express').Router()
const authController = require('../controller/authController')

router.get('/', authController.login)

router.post('/postLogin', authController.postLogin)


module.exports = router