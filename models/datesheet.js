const mongoose = require('mongoose');

const dateSheetSchema = mongoose.Schema({
    course:{
        type: String,
        required:true,
        trim:true
    },
    filePath:{
        type: String,
        required:true,
        trim:true
    }
})

module.exports = mongoose.model('Datesheet',dateSheetSchema)