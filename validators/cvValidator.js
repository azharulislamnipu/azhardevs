const validator = require('validator');
const validate = cv =>{
    let error ={}
   
    if(!cv.cv_name){
        error.cv_name = 'Please upload your cv';
    }
    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;