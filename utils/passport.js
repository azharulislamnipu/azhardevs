var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function(payload, done) {
    
        User.findOne({_id: payload._id})
            .then(user => {
                if(!user){
                    return done(null, false);
                }else{
                    return done(null, user);
                }
            })
            .catch(error => {
                console.log(error);
                return   done(error);
            });
    }));
}