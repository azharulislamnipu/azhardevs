const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Skillschema = new Schema({
    extra_skills: {
        type: Array,
        trim:true,
        default:[]
    },
    professional_skills:[],
    programming_skills:[],
    language_skills:[],
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

const Skills = mongoose.model('Skills', Skillschema);

module.exports = Skills;