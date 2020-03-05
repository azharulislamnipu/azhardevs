const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    type: {
        type: String,
        required: true,
        trim:true
    },
    social_icon: {
        type: String,
        trim:true
    },
    social_tag: {
        type: String,
        trim:true
    },
    social_link: {
        type: String,
        trim:true
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

const Social = mongoose.model('Social', SocialSchema);

module.exports = Social;