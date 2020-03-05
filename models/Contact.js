const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    subject: {
        type: String,
        trim:true,
        required: true,
    },
    organigation: {
        type: String,
        trim:true
    },
    consult_date: {
        type : Date, 
        default: Date.now
    },
    budget: {
        type: String,
        trim:true
    },
    description: {
        type: String,
        trim:true
    },
    replay_message: {
        type: String,
        trim:true
    },
    phone: {
        type: String,
        trim:true
    },
    status: {
        type: String,
        trim:true
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;