const validator = require('validator');
const validate = info =>{
    let error ={}
   
    if(!info.title){
        error.title = 'Please Provide Info title';
    }

    if(!info.info_icon){
        error.info_icon = 'Please Provide Info Icon Name';
    }

    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;