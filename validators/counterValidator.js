const validator = require('validator');
const validate = counter =>{
    let error ={}
   
    if(!counter.title){
        error.title = 'Please Provide Counter title';
    }

    if(!counter.counter_number){
        error.counter_number = 'Please Provide Counter Number';
    }else if(!validator.isNumeric(counter.counter_number)){
        error.counter_number = 'Input Numeric number please';
    }
  
    if(!counter.duration){
        error.counter_number = 'Please Provide Counter Number';
    }else if(!validator.isNumeric(counter.duration)){
        error.duration = 'Input Numeric number please';
    }

    if(!counter.counter_icon){
        error.counter_icon = 'Please Provide Counter Icon Name';
    }

    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;