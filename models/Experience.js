const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    company_name: {
        type: String,
        required: true,
        trim:true
    },
    icon: {
        type: String,
        required: true,
        trim:true
    },
    designation: {
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

const Experience = mongoose.model('Experience', ExperienceSchema);

module.exports = Experience;