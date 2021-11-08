const fs = require('fs')
const Faculty = require('../models/faculty')
const bcrypt = require('bcrypt')


exports.addfaculty = (req,res) => {
    res.render('admin/addFaculty',{msg:'',role:1})
}

exports.savefaculty = async(req,res)=>{
    
    // console.log(req.body);
    // console.log(req.file);

    const _faculty = await Faculty.find({email:req.body.email})

    if(_faculty.length > 0) {
        return res.status(200).render('admin/addFaculty',{msg : 'Email Already Exists',role:1})
    }

    var prevFilepath = req.file.destination+"/"+req.file.filename;

    var _filepath = req.file.destination + "/" + req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1];

    await fs.rename(prevFilepath, _filepath, (err) => {
        if ( err ) console.log('ERROR: ' + err);
    });

    const hashedPassword = await bcrypt.hashSync(req.body.password, 12);

    var data = {
        email:req.body.email,
        password:hashedPassword,
        name:req.body.fname + " " + req.body.lname,
        role:2,
        department:req.body.department,
        technology:req.body.technology,
        filePath:_filepath

    }

    const result = await Faculty(data).save();
    // console.log('result',result);

    if(result)
    {
        res.status(200).render('admin/addFaculty',{msg : 'Saved Successfully !!!',role:1})
    }
    else{
        res.status(200).render('admin/addFaculty',{msg : 'Not Saved Successfully !!!',role:1})
    }
}

exports.viewFaculty = async (req,res)=>{
    var result = await Faculty.find({roll : 2});
    res.render('admin/viewFaculty',{result,role:1});
}

exports.editFaculty = async (req,res)=>{


    // find return array and find by id return object
    
    // const id = req.params.id
    // var result = await Faculty.find({_id:id});
    // console.log(result);
    // var tempFilePath = result[0].filePath;
    // var arrFilepath = tempFilePath.split('/');
    // arrFilepath.splice(0,1);
    // var _filePath = "/" + arrFilepath.join('/');
    // console.log(_filePath);

    // res.render('admin/editFaculty',{result:result[0] ,_filePath , msg:""});
    
    const id = req.params.id
    var result = await Faculty.findById(id)
    var temp = result.filePath.split('/')
    var temp2 = temp.splice(0,1)
    var _filepath = "/" + temp.join('/')
    res.render('admin/editFaculty',{result,_filepath,msg:'',role:1});

}

exports.editFacultyToDB = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.params.id);

    // req.file will give undefined when we do not change the file
    // that y we have to set two conditions for two o/p
    // one of undefinded and another for when new file comes
    // console.log(req.file); 


    var id = req.params.id
    var person = await Faculty.findById(id)

    if(req.file == undefined)
    {
        var prevFilepath = person.filePath
        var temp = prevFilepath.split('/')[3]
        var ext = temp.split('ID')[1];

        var _filepath = "public/uploads/faculty/" + req.body.email + "_ID" + "." + ext;

        await fs.rename(prevFilepath,_filepath,(err)=>{
            if ( err ) console.log('ERROR: ' + err);
        })

        var data = {
            email:req.body.email,
            name:req.body.fname + " " + req.body.lname,
            role:2,
            department:req.body.department,
            technology:req.body.technology,
            filePath:_filepath
        }
        // if don't add new = true here then it will give only prev data 
        const result = await Faculty.findByIdAndUpdate(id,data,{new:true});

        return res.redirect('/viewfaculty');
    
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
            department:req.body.department,
            technology:req.body.technology,
            filePath:_filepath
        }
        const result1 = await Faculty.findByIdAndUpdate(id,data,{new:true})
        // console.log(result);

        return res.redirect('/viewfaculty')
    }

}  