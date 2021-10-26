const fs = require('fs');
const Student = require('../models/student')

exports.addStudent = (req,res)=>{
    res.render("faculty/addStudent",{msg:""});
}

exports.saveStudent = async(req,res)=>{
   console.log(req.body);
   console.log(req.file);

   // this required to change the  name of file
   var prevFilepath = req.file.destination+"/"+req.file.filename;

   // this is to be saved in data base
   var _filepath = req.file.destination + "/" + req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1];

   await fs.rename(prevFilepath, _filepath, (err) => {
       if ( err ) console.log('ERROR: ' + err);
   });

   var data = {
       email:req.body.email,
       password:req.body.password,
       name:req.body.fname + " " + req.body.lname,
       role:3,
       course:req.body.course,
       filePath:_filepath

   }

   const result = await Student(data).save();
   // console.log('result',result);

   if(result)
   {
       res.status(200).render('faculty/addStudent',{msg : 'Saved Successfully !!!'})
   }
   else{
       res.status(200).render('faculty/addStudent',{msg : 'Not Saved Successfully !!!'})
   }

}