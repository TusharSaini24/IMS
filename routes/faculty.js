const router = require('express').Router();
const multer = require('multer');


const facultyController = require("../controller/facultyController");
const isAuth = require('../middleware/isAuth')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/student')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    //   cb(null, file.originalname + '.' + file.mimetype.split('/')[1])
    }
  })
  
const upload = multer({ storage: storage })




router.get('/addstudent',isAuth,facultyController.addStudent);
router.post('/savestudent',upload.single('photo'),facultyController.saveStudent);

module.exports = router;