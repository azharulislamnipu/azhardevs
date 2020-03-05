const Banner = require('../models/Banner');
const Cv = require('../models/Cv');
const {serverError,resourceError, cvUpload} = require('../utils/error');
const bannerValidator = require('../validators/bannerValidator');
const cloud = require('../utils/cloudinaryConfig');
module.exports = {



   create(req, res, next ){
    const bodydata = JSON.parse(JSON.stringify(req.body));
 
        let {  title, name, description , designation, imagename,  status} = bodydata; 

        let  user_id =  req.user._id
        let image = imagename;
  
        let validate = bannerValidator({ title, name, description , designation, image})
  
        if(!validate.isValid){
            return res.status(400).json(validate.error);
        }else{

          cloud.uploadImage(req.file.path).then((result) => {
         
            let image_url = result.secure_url;
             
            let banners = new Banner({title, name, description, designation,  image, image_url, status, user_id});
       
            banners.save()
            .then(bnner => {
                      res.status(201).json({
                          message: 'Banner Created Successfully',
                          ...bnner._doc,
                      })
              
          })
          .catch(error => serverError(res, error))
  
           }).catch(error => serverError(res, error));
     

        }

    },



    update(req, res, next) {
        let { bannerId } = req.params;
    
        const bodydata = JSON.parse(JSON.stringify(req.body));
        let {
            title, name, description ,  designation , image, imagename, current_image_url,  status
        } = bodydata;
     
      
          if(imagename == ''){
            image_url = current_image_url;
            let user_id = req.user._id;
            let validate = bannerValidator({ title, name, description , designation, image})
        
            if (!validate.isValid) {
              return res.status(400).json(validate.error);
            } else {
            
                Banner.findOneAndUpdate(
                { _id: bannerId },
                {
                    title, name, description, designation, image, image_url, status, user_id
                },
                { new: true }
              )
                .then(result => {
                  let { _id } = req.user;
                    Banner.find({ user_id: _id })
                      .then(banner => {
                        res.status(200).json({
                          message: "Update Successfully",
                          ...result._doc,
                          banners: banner
                        });
                      })
                      .catch(error => serverError(res, error));
                })
                .catch(error => serverError(res, error));
    
           
            }


          }else{
           
            let image = bodydata.imagename;
    
            let user_id = req.user._id;
            let validate = bannerValidator({ title, name, description , designation, image})
        
            if (!validate.isValid) {
              return res.status(400).json(validate.error);
            } else {
              cloud.uploadImage(req.file.path).then((result) => {
                let image_url = result.secure_url;
                Banner.findOneAndUpdate(
                { _id: bannerId },
                {
                    title, name, description, designation, image, image_url, status, user_id
                },
                { new: true }
              )
                .then(result => {
                  let { _id } = req.user;
                    Banner.find({ user_id: _id })
                      .then(banner => {
                        res.status(200).json({
                          message: "Update Successfully",
                          ...result._doc,
                          banners: banner
                        });
                      })
                      .catch(error => serverError(res, error));
                })
                .catch(error => serverError(res, error));
    
              }).catch(error => serverError(res, error));
            }


          }
    
      

      },


    getAll(req, res,next) {
        Banner.find()
            .then(banner => {
                if (banner.length === 0) {
                    res.status(200).json({
                        message: 'No Banner Found'
                    })
                } else {
                    res.status(200).json(banner)
                }
            })
            .catch(error => serverError(res, error))
    },

    remove(req, res) {
        let { bannerId } = req.params

        Banner.findOneAndDelete({ _id: bannerId })
        .then(result => {
          let { _id } = req.user;
          Banner.find({ user_id: _id })
            .then(banner => {
              res.status(200).json({
                message: "Deleted Successfully",
                ...result._doc,
                banners: banner
              });
            })
            .catch(error => serverError(res, error));
        })
        .catch(error => serverError(res, error));
    }


}