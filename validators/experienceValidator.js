const validator = require('validator');
const validate = experience =>{
    let error ={}
   
    if(!experience.company_name){
        error.company_name = 'Please Provide Company Name';
    }

    if(!experience.icon){
        error.icon = 'Please Provide Company icon';
    }

    if(!experience.designation){
        error.designation = 'Please Provide Designation';
    }

    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;