const admin = (req, res, next) => {
    if(req.user.role != 'admin' ){
        return res.status(400).json({
            message:'Your are not admin allow for this task'
        })
    }
    next();
 }
 
 const supervisor = (req, res, next) => {
    if(req.user.role != 'supervisor' ){
        return res.status(400).json({
            message:'Your are not supperadmin allow for this task'
        })
    }
    next();
 }

 module.exports = {admin,supervisor}