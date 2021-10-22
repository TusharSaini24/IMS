const router = require('express').Router()
const adminController = require('../controller/adminController')
const multer = require('multer')


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

router.get('/addfaculty', adminController.addfaculty)

router.post('/savefaculty',upload.single('fufile'), adminController.savefaculty)



module.exports = router