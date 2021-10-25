const router = require('express').Router()
const adminController = require('../controller/adminController')
const multer = require('multer')
const isAuth = require('../middleware/isAuth')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/faculty')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    //   cb(null, file.originalname + '.' + file.mimetype.split('/')[1])
    }
  })
  
const upload = multer({ storage: storage })

router.get('/addfaculty', isAuth, adminController.addfaculty)

router.post('/savefaculty',upload.single('fufile'), adminController.savefaculty)

router.get('/viewfaculty',isAuth,adminController.viewFaculty);

router.get('/editfaculty/:id',isAuth,adminController.editFaculty);

module.exports = router