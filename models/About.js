const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AboutSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    sub_title: {
        type: String,
        trim:true
    },
    about_image:{
        type: String
    },
    about_image_url: {
        type: String
    },
    about_info: {
        type: String,
        trim:true
    },
    bio:{
        name: {
            type: String,
            trim:true
        },
        email: {
            type: String,
            trim:true
        },
        phone: {
            type: String,
            trim:true
        },
        address: {
            type: String,
            trim:true
        },
        age: {
            type: String,
            trim:true
        },
        nationality: {
            type: String,
            trim:true
        }
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
    },
});

const About = mongoose.model('About', AboutSchema);

module.exports = About;