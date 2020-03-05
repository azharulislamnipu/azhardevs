const validator = require('validator');
const langValidate = skills =>{
    let error ={}

    if(!skills.lang_title){
        error.lang_title = 'Please Provide language Title';
    }
    if(!skills.lang_progress){
        error.lang_progress = 'Please Provide language Progress';
    }else if(!validator.isNumeric(skills.lang_progress)){
        error.lang_progress = 'Input Numeric number please';
    }else if(validator.toInt(skills.lang_progress) > 100){
        error.lang_progress = 'Number Must be 100 or less then 100';
    }
    
    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = langValidate;