const Faculty = require('../models/faculty')

exports.login = (req,res) => {
    // console.log("session in login",req.session.user);
    res.render('login',{msg:''})
}

exports.logout = (req,res) => {
    // console.log("session in logout",req.session.user);
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}

exports.dashboard = async (req,res) => {
    // console.log("session",req.session.user);
    // console.log(req.body);

    // const result = await Faculty.find()

    // console.log(result[0].filePath);

    // res.render('dashboard',{image:result[0].filePath})
    res.render('dashboard')
}

exports.postLogin = async (req,res) => {
    // console.log(req.body);
    var email = req.body.email
    var password = req.body.password

    var result = await Faculty.find({email:email,password:password})
    // console.log(result);
    if(result.length > 0) {

        req.session.user = result[0]
        req.session.save(() => {
            res.redirect('/dashboard')
        })

    }
    else {
        res.render('login',{msg:"Incorrect Details"})
    }



    // res.redirect('/dashboard')
}