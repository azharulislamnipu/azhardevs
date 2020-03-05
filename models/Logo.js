const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    logo_name:{   type: String},
    logo_url: {
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

const Logo = mongoose.model('Logo', LogSchema);

module.exports = Logo;