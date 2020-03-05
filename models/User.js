const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
       },
    avatar: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    token:{
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;