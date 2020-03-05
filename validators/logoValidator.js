const validator = require('validator');
const validate = logo =>{
    let error ={}
   
    if(!logo.logo_name){
        error.logo_name = 'Please upload your Logo';
    }
    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;