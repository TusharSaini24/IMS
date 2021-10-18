const router = require('express').Router()
const adminController = require('../controller/adminController')

router.get('/addfaculty', adminController.addfaculty)



module.exports = router