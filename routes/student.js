const router = require('express').Router();

const studentController = require('../controller/studentController')

router.get('/notifications',studentController.notifications)

router.get('/payfee/:id',studentController.payfee)

router.post('/sendfee/:id',studentController.sendfee)

module.exports = router;