const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const User = require('../models/User');
const {serverError,resourceError} = require('../utils/error');

module.exports = {


//login controller
    login( req, res){
        // extract data from request
        // validation check user data
        // echek for user availability
        // compaire with given password
        // generate token and response back
       

        let {email, password} = req.body;

        let validate = loginValidator({ email, password})
 
        if(!validate.isValid){
            return res.status(400).json(validate.error);
        }else{
            //check user exist
        User.findOne({email})
        .then(user => {
            if(!user){
                return resourceError(res, 'User Doesn\'t Exis');
               
            }else{

                bcrypt.compare(password, user.password, (err, result) => {

                    if(err){
                        return serverError(res, err);
                    }
                    if(!result){
                        return resourceError(res, 'Password Doesn\'t Match');
                    }

                    let token = jwt.sign({
                        _id:user.id,
                        name:user.name,
                        email:user.email,
                        role:user.role,
                        avatar:user.avatar
                    }, process.env.SECRET,{expiresIn:'2h'});

                    user.token = `Bearer ${token}`;
                    user.save(user);

                    res.cookie('p_auth',user.token,'',false).status(200).json({
                        message:'Login Successfull',
                        token:`Bearer ${token}`
                        });
                    
                  
                })
                
               
            }
            
        })
        
   
        }
    },

    //register controller
    
    register( req, res){

        //read cliednt data
        // validation check user data
        //check for duplicate data
        // new user object
        // save to database
        // response back to new data
        

       let {name, email, password, confrimPassword , role, token} = req.body;

       let validate = registerValidator({ name, email, password, confrimPassword})

       if(!validate.isValid){
        return res.status(400).json(validate.error);
       }else{

        //check user exist
        User.findOne({email})
            .then(user => {
                if(user){
                    return resourceError(res, 'Email Already Exist');
                }else{
                    bcrypt.hash(password,11,(err, hash) => {

                        if(err){
                            return resourceError(res, 'Server Error Occured');
                           
                        }

                        let user = new User({
                            name, email, password:hash, role, token
                        });

                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message:'User Created Success Fully'
                                    })
                            } )
                            .catch(error => serverError(res, error));
                      
                    })
                    
                   
                }
                
            })
            .catch(error => serverError(res, error));
       
       }
        

    },

    
getAllUser(req, res) {

    User.find()
      .then(users => {
        if (users.length === 0) {
          res.status(200).json({
            message: "No users Found"
          });
        } else {
          res.status(200).json(users);
        }
      })
      .catch(error => serverError(res, error));


}
}


