const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
        trim:true
    },
    name:{
        type: String,
        required:true,
        trim:true
    },
    role:{
        type: Number,
        required:true,
        trim:true
    },
    department:{
        type: String,
        required:true,
        trim:true
    },
    technology:{
        type: String,
        required:true,
        trim:true
    },
    filePath:{
        type: String,
        required:true,
        trim:true
    },
})


module.exports = mongoose.model('Faculty',facultySchema)