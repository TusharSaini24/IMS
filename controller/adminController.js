const fs = require('fs')
const Faculty = require('../models/faculty')


exports.addfaculty = (req,res) => {
    res.render('admin/addFaculty',{msg:''})
}

exports.savefaculty = async (req,res) => {
    // console.log(req.body);

    // console.log(req.file);

    var prevFilepath = req.file.destination + "/" + req.file.filename
    var _filepath = req.file.destination + "/" + req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1]
    // var filename = req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1]

    await fs.rename(prevFilepath, _filepath, (err) => {
        if ( err ) console.log('ERROR: ' + err);
    });

    // console.log(prevFilename);
    // console.log(_filepath);
    var data = {
        email:req.body.email,
        password:req.body.password,
        name:req.body.fname + " " + req.body.lname,
        role:2,
        department:req.body.department,
        technology:req.body.technology,
        filePath:_filepath

    }

    const result = await Faculty(data).save()
    if(result) {
        return res.status(200).render('admin/addfaculty',{msg:"Saved Successfully"})
    }

    else {
        return res.status(200).render('admin/addfaculty',{msg:"Error Occured.Try Again"})
    }
    // console.log(result);
    // console.log(req.file);
    // res.render('admin/addFaculty')
}

exports.viewFaculty = async (req,res)=>{
    var result = await Faculty.find({role:2});
    res.render('admin/viewFaculty',{result});
}

exports.editFaculty = async (req,res)=>{

    const id = req.params.id
    // console.log(id);
    var result = await Faculty.findById(id)
    // console.log(result);
    var temp = result.filePath.split('/')
    var temp2 = temp.splice(0,1)
    // console.log(temp.join('/'));
    var _filepath = "/" + temp.join('/')
    res.render('admin/editFaculty',{result,_filepath,msg:''});
}