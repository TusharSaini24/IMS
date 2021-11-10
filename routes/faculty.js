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

const storagett = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/timetable')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    //   cb(null, file.originalname + '.' + file.mimetype.split('/')[1])
    }
  })
  
const uploadtt = multer({ storage: storagett })


const storageds = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/datesheet')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    //   cb(null, file.originalname + '.' + file.mimetype.split('/')[1])
    }
  })
  
const uploadds = multer({ storage: storageds })

const storageassn = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/assignment')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    //   cb(null, file.originalname + '.' + file.mimetype.split('/')[1])
    }
  })
  
const uploadassn = multer({ storage: storageassn })




router.get('/addstudent',isAuth,facultyController.addStudent);
router.post('/savestudent',upload.single('photo'),facultyController.saveStudent);
router.get('/viewstudent',facultyController.viewStudent);
router.get('/editstudent/:id',facultyController.editStudent);
router.post('/editstudentToDB/:id',upload.single('fufile'),facultyController.editStudentToDB);
router.get('/posttimetable',facultyController.postTimeTable);
router.post('/savetimetable',uploadtt.single('tt'),facultyController.saveTimeTable);
router.get('/postdatesheet',facultyController.postDateSheet);
router.post('/savedatesheet',uploadds.single('ds'),facultyController.saveDateSheet);
router.get('/postassignment',facultyController.postAssignment);
router.post('/saveassignment',uploadassn.single('assn'),facultyController.saveAssignment);

module.exports = router;