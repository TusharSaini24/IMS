const fs = require('fs')
const Faculty = require('../models/faculty')


exports.addfaculty = (req,res) => {
    res.render('admin/addFaculty',{msg:''})
}

exports.savefaculty = async (req,res) => {

    var prevFilepath = req.file.destination + "/" + req.file.filename
    var _filepath = req.file.destination + "/" + req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1]

    await fs.rename(prevFilepath, _filepath, (err) => {
        if ( err ) console.log('ERROR: ' + err);
    });

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

exports.editFacultyToDB = async (req,res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    // console.log(req.file);

    var id = req.params.id
    var person = await Faculty.findById(id)
    if(req.file == undefined) {

        var prevFilepath = person.filePath
        var temp = prevFilepath.split('/')[3]
        var ext = temp.split('ID')[1]
        var _filepath = "public/uploads/faculty/" + req.body.email + "_ID" + "." + ext
    
        await fs.rename(prevFilepath, _filepath, (err) => {
            if ( err ) console.log('ERROR: ' + err);
        });


        var data = {
            email:req.body.email,
            name:req.body.fname + " " + req.body.lname,
            department:req.body.department,
            technology:req.body.technology,
        }

        const result1 = await Faculty.findByIdAndUpdate(id,data,{new:true})
        // console.log(result);

        return res.redirect('/viewfaculty')
    }
    else {

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
            department:req.body.department,
            technology:req.body.technology,
            filePath:_filepath
        }
        const result1 = await Faculty.findByIdAndUpdate(id,data,{new:true})
        // console.log(result);

        return res.redirect('/viewfaculty')
    }
}