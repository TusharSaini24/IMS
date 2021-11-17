const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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
    course:{
        type: String,
        required:true,
        trim:true
    },
    filePath:{
        type: String,
        required:true,
        trim:true
    },
    feePayed:{
        type: Boolean,
        required:true,
        trim:true
    },
})


module.exports = mongoose.model('Student',studentSchema);