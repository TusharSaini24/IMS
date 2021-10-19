const Faculty = require('../models/faculty')

exports.login = (req,res) => {
    res.render('login')
}

exports.dashboard = async (req,res) => {
    // console.log(req.body);

    const result = await Faculty.find()

    console.log(result[0].filePath);

    res.render('dashboard',{image:result[0].filePath})
}

exports.postLogin = (req,res) => {
    // console.log(req.body);
    res.redirect('/dashboard')
}