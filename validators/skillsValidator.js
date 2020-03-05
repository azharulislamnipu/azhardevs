const validator = require('validator');
const validate = skills =>{
    let error ={}

    if(!skills.prof_progress_title){
        error.prof_progress_title = 'Please Provide Professional Progress Title';
    }
    if(!skills.prof_progress){
        error.prof_progress = 'Please Provide Professional Progress';
    }else if(!validator.isNumeric(skills.prof_progress)){
        error.prof_progress = 'Input Numeric number please';
    }else if(validator.toInt(skills.prof_progress) > 100){
        error.prof_progress = 'Number Must be 100 or less then 100';
    }
    
    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;