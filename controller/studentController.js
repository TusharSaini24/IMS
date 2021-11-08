const TT = require('../models/timetable')
const ASSN = require('../models/assignment')
const DS = require('../models/datesheet')

exports.notifications = async (req,res) => {

    var stuCourse = req.session.user.course

    var resultTT = await TT.find({course:stuCourse})
    var filepath_TT = resultTT[0].filePath

    var resultASSN = await ASSN.find({course:stuCourse})
    var filepath_ASSN = resultTT[0].filePath

    var resultDS = await DS.find({course:stuCourse})
    var filepath_DS = resultTT[0].filePath

    res.render('student/Notifications',{filepath_TT,filepath_ASSN,filepath_DS,role:3})
}