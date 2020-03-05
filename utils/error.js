const cloud = require('./cloudinaryConfig');
module.exports = {
    serverError (res, error){
        res.status(500).json({
            message:'Server Error Occured'
        });
    },

    resourceError(res, message){
        res.status(500).json({
            message
        });
    },

    cvUpload(cv) {
        for (let i = 0; i < cv.length; i++) {
          let cvpath = cv[i].path;
           cloud.uploadImage(cvpath).then((result) => {
            res.status(201).json({ /* Send back a success response */
              status: 'success',
              imageCloudData: result
            });
    
          })
          .catch((error) => serverError(res, error)); 

        }
      },
}