const validator = require('validator');
const validate = education =>{
    let error ={}
   
    if(!education.organization_name){
        error.organization_name = 'Please Provide Organization Name';
    }

    if(!education.program_title){
        error.program_title = 'Please Provide Program Title';
    }

    if(!education.description){
        error.description = 'Please Provide description';
    }

    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;