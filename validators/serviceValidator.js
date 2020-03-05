const validator = require('validator');
const validate = service =>{
    let error ={}
   
    if(!service.title){
        error.title = 'Please Provide Service title';
    }

    if(!service.icon){
        error.icon = 'Please Provide Service Icon Name';
    }
    
    if(!service.description){
        error.description = 'Please Provide Service Description';
    }

    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;