const validator = require('validator');
const validate = contact =>{
    let error ={}
   
    if(!contact.fullname){
        error.fullname = 'Please Provide Your Full Name';
    }

    if(!contact.email){
        error.email = 'Please Provide Contact Email';
    }else if(!validator.isEmail(contact.email)){
        error.email = 'Please Provide valide email address';
    }
    if(!contact.subject){
        error.subject = 'Please Provide Your Subject';
    }
    if(!contact.consult_date){
        error.consult_date = 'Please Select Consult Date';
    }
    if(!contact.budget){
        error.budget = 'Please Provide Your Budget';
    }

    if(!contact.description){
        error.description = 'Please Provide project description';
    }
    if(!contact.replay_message){
        error.replay_message = 'Please Provide project replay message';
    }

    if(!contact.phone){
        error.phone = 'Please Provide Counter Number';
    }else if(!validator.isNumeric(contact.phone)){
        error.phone = 'Input Numeric number please';
    }

    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;