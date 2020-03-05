const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    title: {
        type: String,
        trim:true
    },
    icon:{
        type: String,
        trim:true
    },
    description:{
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

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;