const validator = require('validator');
const validate = social =>{
    let error ={}
   
    if(!social.title){
        error.title = 'Please Provide Social title';
    }
    if(!social.type){
        error.type = 'Please Provide Social Type';
    }
    if(!social.social_icon){
        error.social_icon = 'Please Provide social Icon';
    }
    if(!social.social_tag){
        error.social_tag = 'Please Provide social Tag';
    }

    if(!social.social_link){
        error.social_link = 'Please Provide social link';
    }else if(!validator.isURL(social.social_link, {protocols: ['http','https','ftp'], require_tld: true, require_protocol: true, require_host: true})){
        error.social_link = 'Please Provide valid social link ';
    }
    return{
        error,
        isValid:Object.keys(error).length == 0
    }
}

module.exports = validate;