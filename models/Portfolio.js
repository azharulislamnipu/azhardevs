const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    title: {
        type: String,
        trim:true
    },
    description: {
        type: String,
        trim:true
    },
    type: {
        type: String,
        trim:true
    },
    feature_image:{
        type: String,
        trim:true
    },
    image_url:[],
    gellary_image:{
        type: Array,
        trim:true,
        default:[]
    },
    client_name: {
        type: String,
        trim:true
    },
    created_by: {
        type: String,
        trim:true
    },
    completed_date: {
        type : Date, 
        default: Date.now
    },
    skills:{
        type: Array,
        trim:true,
        default:[]
    },
    preview_url:{
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

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;