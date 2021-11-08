const router = require('express').Router();

const studentController = require('../controller/studentController')

router.get('/notifications',studentController.notifications)

module.exports = router;