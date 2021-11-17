const TT = require('../models/timetable')
const ASSN = require('../models/assignment')
const DS = require('../models/datesheet')
const Student = require('../models/student')
const nodemailer = require('nodemailer')

require('dotenv').config()

exports.notifications = async (req,res) => {

    var stuCourse = req.session.user.course
    // var feePayed = req.session.user.feePayed
    const user = await Student.findById(req.session.user._id)

    var resultTT = await TT.find({course:stuCourse})
    // console.log(resultTT);
    if(resultTT.length > 0) {
        var filepath_TT = resultTT[0].filePath
    }

    var resultASSN = await ASSN.find({course:stuCourse})
    if(resultASSN.length > 0) {
        var filepath_ASSN = resultASSN[0].filePath
    }

    var resultDS = await DS.find({course:stuCourse})
    if(resultDS.length > 0) {
        var filepath_DS = resultDS[0].filePath
    }


    res.render('student/Notifications',{filepath_TT,filepath_ASSN,filepath_DS,feePayed:user.feePayed,id:user._id,role:3})
}

exports.payfee = async (req,res) => {
    const userid = req.params.id
    const user = await Student.findById(userid)

    if(user.feePayed == true) {
        return res.render('student/Payment',{user,role:3,fees,disable:true,msg:'Fee Already Payed'})
    }
    const course = user.course
    var fees
    if(course == 'MBA') fees = 25000
    if(course == 'BBA') fees = 15000
    if(course == 'BCA') fees = 12000
    if(course == 'MCA') fees = 22000

    res.render('student/Payment',{user,role:3,fees,disable:false,msg:''})
}

exports.sendfee = async (req,res) => {
    const userid = req.params.id

    const result = await Student.findByIdAndUpdate(userid,{feePayed:true},{new:true})

    const course = result.course
    var fees
    if(course == 'MBA') fees = 25000
    if(course == 'BBA') fees = 15000
    if(course == 'BCA') fees = 12000
    if(course == 'MCA') fees = 22000

    res.render('student/Payment',{user:result,role:3,fees,disable:true,msg:'Fee Payed Successfully'})
}