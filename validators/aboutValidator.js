const validator = require('validator');
const validate = about =>{
    let error ={}
   
    if(!about.title){
        error.title = 'Please Provide about title';
    }
     
    if(!about.sub_title){
        error.sub_title = 'Please Provide about sub title';
    }

    if(!about.about_image){
        error.about_image = 'Uplad About Image';
    }
    if(!about.name){
        error.name = 'Please Provide Bio name';
    }

    if(!about.email){
        error.email = 'Please Provide email address ';
    }else if(!validator.isEmail(about.email)){
        error.email = 'Please Provide valide email address';
    }

    if(!about.phone){
        error.phone = 'Please Provide phone number ';
    }else if(!validator.isNumeric(about.phone)){
        error.phone = 'phone number must be numeric';
    }

    if(!about.address){
        error.address = 'Please Provide Bio Address';
    }
    
    if(!about.age){
        error.age = 'Please Provide Bio age';
    }

    if(!about.nationality){
        error.nationality = 'Please Provide Bio nationality';
    }
    
  

    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;