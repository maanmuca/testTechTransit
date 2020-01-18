var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var coursesSchema = new Schema({
    href: {
        type: String,
        required:false,
        trim:true,
        unique:true
    },
    first: {
        type: String,
        required:false,
        trim:true,
        unique:true
    },
    previous: {
        type: String,
        required:false,
        trim:true,
        unique:true
    },
    next: {
        type: String,
        required:false,
        trim:true,
        unique:true
    },
    last: {
        type: String,
        required:false,
        trim:true,
        unique:true
    },
    offset:{
        type:Number,
        required:false,
    },
    limit:{
        type:Number,
        required:false,
    },
    size: {
        type:Number,
        required:false,
    },
    items: []
});


var courses = mongoose.model('courses',coursesSchema);

module.exports ={courses};