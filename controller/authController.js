const bcrypt = require('bcrypt')

const Faculty = require('../models/faculty')
const Student = require("../models/student");

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
    res.render('dashboard',{role:req.session.user.role})
}

exports.postLogin = async(req,res)=>{
    // console.log('hello');
    // console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    let result
    if(req.body.isfaculty == 'on') {
        result = await Faculty.find({email : email});   
    }
    else {
        result = await Student.find({email : email});
    }

    // console.log(result);

    // console.log('EandP',result);

    if(result.length > 0 ) // user is email and password is valid or not
    {
        const isValid = bcrypt.compareSync(password, result[0].password);
        if(!isValid) {
            return res.render('login',{msg: "Incorrect Password"});
        }
        req.session.user = result[0];
        req.session.save(()=>{
            res.redirect('/dashboard');
        })
        // if(req.body.rememberme == 'on') {
        //     req.session.user = result[0];
        //     req.session.save(()=>{
        //         res.redirect('/dashboard');
        //     })
        // }
        // else {
        //     res.redirect('/dashboard');
        // }
    }
    else{
        res.render('login',{msg: "Incorrect details"});
    }

}