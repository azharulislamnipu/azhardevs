const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    info_icon: {
        type: String,
        trim:true
    },
    info_name: {
        type: Array,
        trim:true,
        default:[]
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

const Info = mongoose.model('Info', InfoSchema);

module.exports = Info;