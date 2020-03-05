const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        trim:true
    },
    designation: {
        type: Array,
        trim:true,
        default:[]
    },
    image: {
        type: String
    },
    image_url: {
        type: String
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

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;