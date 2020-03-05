const passport = require('passport');
const User = require('../models/User');
module.exports = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log(err);
            
            return next(err); }
        if (!user) { 
            return res.status(400).json({
                message: 'Authincation Failed'
            })
            // return res.redirect('/login');
         }
       
         req.user = user;
         return next();
      })(req, res, next);
}