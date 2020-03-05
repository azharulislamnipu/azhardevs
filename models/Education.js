const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    organization_name: {
        type: String,
        required: true,
        trim:true
    },
    program_title: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        trim:true,
        required: true,
    },
    start_date: {
        type : Date, 
        default: Date.now
    },
    end_date: {
        type : Date, 
        default: Date.now
    },
    status: {
        type: String,
        trim:true
    },
    user_id:{
        type: String,
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

const Education = mongoose.model('Education', EducationSchema);

module.exports = Education;