const mongoose = require('mongoose');

const timeTableSchema = mongoose.Schema({
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
    role:{
        type:Number,
        required:true,
        trim:true
    }
})

module.exports = mongoose.model('Timetable',timeTableSchema)