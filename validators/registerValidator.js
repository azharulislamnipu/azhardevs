const validator = require('validator');
const validate = user =>{
    let error = {};
    if(!user.name){
        error.name = 'Please Provide Your Name';
    }
    if(!user.email){
        error.email = 'Please Provide Your Email';
    }else if(!validator.isEmail(user.email)){
        error.email = 'Please Provide Your Valide Email';
    }
    if(!user.password){
        error.password = 'Please Provide Your Password';
    }else if(user.password.length < 6){
        error.password = 'Password Must be Greater Or Equal 6 Character';
    }
    if(!user.confrimPassword){
        error.confrimPassword = 'Please Provide Your Confromation Password';
    }else if(user.password != user.confrimPassword ){
        error.confrimPassword = 'Password Doesn\'t Match';
    }
    return{
        error,
        isValid:Object.keys(error).length === 0
    }
}

module.exports = validate;