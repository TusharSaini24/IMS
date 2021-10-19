const fs = require('fs')
const Faculty = require('../models/faculty')


exports.addfaculty = (req,res) => {
    res.render('admin/addFaculty')
}

exports.savefaculty = async (req,res) => {
    // console.log(req.body);


    var prevFilepath = req.file.destination + "/" + req.file.filename
    var _filepath = req.file.destination + "/" + req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1]
    // var filename = req.body.email + "_ID" + "." + req.file.mimetype.split('/')[1]

    await fs.rename(prevFilepath, _filepath, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    // console.log(prevFilename);
    // console.log(_filepath);
    var data = {
        email:req.body.email,
        password:req.body.password,
        name:req.body.fname + " " + req.body.lname,
        role:1,
        department:req.body.department,
        technology:req.body.technology,
        filePath:_filepath

    }

    const result = await Faculty(data).save()
    console.log(result);
    // console.log(req.file);
    // res.render('admin/addFaculty')
}