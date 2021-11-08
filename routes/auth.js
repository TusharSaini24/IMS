const router = require('express').Router()
const bcrypt = require('bcrypt')

const authController = require('../controller/authController')

const isAuth = require('../middleware/isAuth')
const faculty = require('../models/faculty')

router.get('/', authController.login)

router.get('/logout', authController.logout)

router.get('/dashboard', isAuth,authController.dashboard)

router.post('/postLogin', authController.postLogin)


// router.get('/addadmin',async(req,res)=>{
    

//     const hashedPassword = await bcrypt.hashSync('123456', 12);

//     var data = {
//         email:'sainitushar239@gmail.com',
//         password:hashedPassword,
//         name:'Tushar Saini',
//         role:1

//     }

//     const result = await faculty(data).save();
//     // console.log('result',result);
// })

module.exports = router