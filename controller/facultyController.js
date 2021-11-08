const exp = require('constants');
const fs = require('fs');
const bcrypt = require('bcrypt');

const Student = require('../models/student')
const Timetable = require('../models/timetable');
const Datesheet = require('../models/datesheet');
const Assignment = require('../models/assignment');


exports.addStudent = (req,res)=>{
    res.render("faculty/addStudent",{msg:"",role:2});
}

exports.saveStudent = async(req,res)=>{
//    console.log(req.body);
//    console.log(req.file);

   // this required to change the  name of file
   var prevFilepath = req.file.destination+"/"+req.file.filename;

   // this is to be saved in data base
   var _filepath = req.file.destination + "/" + req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1];

   await fs.rename(prevFilepath, _filepath, (err) => {
       if ( err ) console.log('ERROR: ' + err);
   });

   const hashedPassword = await bcrypt.hashSync(req.body.password , 12);
   var data = {
       email:req.body.email,
       password:hashedPassword,
       name:req.body.fname + " " + req.body.lname,
       role:3,
       course:req.body.course,
       filePath:_filepath

   }

   const result = await Student(data).save();
   // console.log('result',result);

   if(result)
   {
       res.status(200).render('faculty/addStudent',{msg : 'Saved Successfully !!!',role:2})
   }
   else{
       res.status(200).render('faculty/addStudent',{msg : 'Not Saved Successfully !!!',role:2})
   }

}

exports.viewStudent = async(req,res)=>{

    const result = await Student.find({role:3});

    res.render('faculty/viewStudent',{result,role:2})
}

exports.editStudent = async(req,res)=>{
    // to post photo from data base to browser we need to remove public becoz
    // it will automatically add public to its path
    const id = req.params.id
    var result = await Student.findById(id)
    // console.log(result);
    var temp = result.filePath.split('/')
    var temp2 = temp.splice(0,1)
    var _filepath = "/" + temp.join('/');
    res.render('faculty/editStudent',{result,_filepath,msg:'',role:2})
}

exports.editStudentToDB = async(req,res)=>{
    console.log(req.body);


    var id = req.params.id
    var person = await Student.findById(id)

    if(req.file == undefined)
    {
        var prevFilepath = person.filePath
        var temp = prevFilepath.split('/')[3]
        var ext = temp.split('ID')[1];

        var _filepath = "public/uploads/student/" + req.body.email + "_ID" + "." + ext;

        await fs.rename(prevFilepath,_filepath,(err)=>{
            if ( err ) console.log('ERROR: ' + err);
        })

        var data = {
            email:req.body.email,
            name:req.body.fname + " " + req.body.lname,
            course:req.body.course,
            filePath:_filepath
        }
        // if don't add new = true here then it will give only prev data 
        const result = await Student.findByIdAndUpdate(id,data,{new:true});

        return res.redirect('/viewstudent');
    
    }
    else{
        var oldFilePath = person.filePath

        await fs.unlink(oldFilePath, (err) => {
            if ( err ) console.log('ERROR: ' + err);
        })
        var prevFilepath = req.file.destination + "/" + req.file.filename
        var _filepath = req.file.destination + "/" + req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1]
    
        await fs.rename(prevFilepath, _filepath, (err) => {
            if ( err ) console.log('ERROR: ' + err);
        });

        var data = {
            email:req.body.email,
            name:req.body.fname + " " + req.body.lname,
            course:req.body.course,
            filePath:_filepath
        }
        const result1 = await Student.findByIdAndUpdate(id,data,{new:true})
        // console.log(result);

        return res.redirect('/viewstudent')
    }
}

exports.postTimeTable = (req,res)=>{
    res.render('faculty/postTimeTable',{msg:"",role:2});
}

exports.saveTimeTable = async(req,res)=>{
    
    // console.log(req.body);
    // console.log(req.file);
    const oldfilepath = req.file.destination+'/'+req.file.filename;
    const _filepath = req.file.destination + '/'+req.body.course+'_TT'+'.' + req.file.mimetype.split('/')[1];
    fs.rename(oldfilepath,_filepath,(err)=>{
        if ( err ) console.log('ERROR: ' + err);
    })
    const data = {
        role : 4,
        course: req.body.course,
        filePath: _filepath
    }

    const result = await Timetable(data).save();
    // console.log('result',result);

    if(result)
    {
        res.status(200).render('faculty/postTimeTable',{msg : 'Posted Successfully !!!',role:2})
    }
    else{
        res.status(200).render('faculty/postTimeTable',{msg : 'Not Posted Successfully !!!',role:2})
    }
    
}

exports.postDateSheet = (req,res)=>{
    res.render('faculty/postDateSheet',{msg :"",role:2});
}

exports.saveDateSheet = async(req,res)=>{

    // console.log(req.body);
    // console.log(req.file);

    const oldfilepath = req.file.destination+'/'+req.file.filename;
    const _filepath = req.file.destination + '/'+req.body.course+'_DS'+'.' + req.file.mimetype.split('/')[1];
    fs.rename(oldfilepath,_filepath,(err)=>{
        if ( err ) console.log('ERROR: ' + err);
    })

    const data = {
        course: req.body.course,
        filePath: _filepath
    }

    const result = await Datesheet(data).save();
    // console.log('result',result);

    if(result)
    {
        res.status(200).render('faculty/postDateSheet',{msg : 'Posted Successfully !!!',role:2})
    }
    else{
        res.status(200).render('faculty/postDateSheet',{msg : 'Not Posted Successfully !!!',role:2})
    }
}

exports.postAssignment = (req,res)=>{
    res.render('faculty/postAssignment',{msg:'',role:2});
}

exports.saveAssignment = async(req,res)=>{

    const oldfilepath = req.file.destination+'/'+req.file.filename;
    const _filepath = req.file.destination + '/'+req.body.course+'_ASSN'+'.' + req.file.mimetype.split('/')[1];
    fs.rename(oldfilepath,_filepath,(err)=>{
        if ( err ) console.log('ERROR: ' + err);
    })

    const data = {
        course: req.body.course,
        filePath: _filepath
    }

    const result = await Assignment(data).save();
    // console.log('result',result);

    if(result)
    {
        res.status(200).render('faculty/postAssignment',{msg : 'Posted Successfully !!!',role:2})
    }
    else{
        res.status(200).render('faculty/postAssignment',{msg : 'Not Posted Successfully !!!',role:2})
    }
}