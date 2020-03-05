const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouterSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    counter_number: {
        type: String,
        trim:true
    },
    counter_icon: {
        type: String,
        trim:true
    },
    duration: {
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

const Counter = mongoose.model('Counter', CouterSchema);

module.exports = Counter;