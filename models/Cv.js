const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CvSchema = new Schema({
    cv_name:{   type: String},
    cv_url: {
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

const Cv = mongoose.model('Cv', CvSchema);

module.exports = Cv;