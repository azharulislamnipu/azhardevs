const Social = require("../models/Social");
const { serverError, resourceError } = require("../utils/error");
const socialValidator = require("../validators/socialValidator");

module.exports = {
    create(req, res, next) {
        let { title,
            type,
            social_icon,
            social_tag,
            social_link, status } = req.body;
        let user_id = req.user._id;
        let validate = socialValidator({ title,
            type,
            social_icon,
            social_tag,
            social_link });
    
        if (!validate.isValid) {
          return res.status(400).json(validate.error);
        } else {
          
        Social.findOne({type})
        .then(result => {
          if(result){
            return resourceError(res, 'Social Already Exist');
        }else{
          let socials = new Social({
            title,
            type,
            social_icon,
            social_tag,
            social_link,
            status,
            user_id
          });
          socials
            .save()
            .then(social => {
              res.status(201).json({
                message: "Social Created Successfully",
                ...social._doc
              });
            })
            .catch(error => serverError(res, error));
          }

          }).catch(error => serverError(res, error));
        

        }
      },

      getAll(req, res, next) {
        // let { _id } = req.user;
        Social.find()
          .then(social => {
            if (social.length === 0) {
              res.status(200).json({
                message: "No counter Found"
              });
            } else {
              res.status(200).json(social);
            }
          })
          .catch(error => serverError(res, error));
      },

      update(req, res) {
        let { socialId } = req.params;
    
        let { title,
          type,
          social_icon,
          social_tag,
          social_link, status } = req.body;
      let user_id = req.user._id;
      let validate = socialValidator({ title,
          type,
          social_icon,
          social_tag,
          social_link });
    
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
          } else { 

              Social.findOneAndUpdate(
                { _id: socialId },
                { title,
                  type,
                  social_icon,
                  social_tag,
                  social_link,
                  status,
                  user_id},
                { new: true }
              )
                .then(result => {
                  let { _id } = req.user;
                  Social.find({ user_id: _id })
                    .then(social => {
                      res.status(200).json({
                        message: "Update Successfully",
                        ...result._doc,
                        socials: social
                      });
                    })
                    .catch(error => serverError(res, error));
                })
                .catch(error => serverError(res, error));


        }
      },

      removeSocial(req, res) {
        let { socialId } = req.params;
    
        Social.findOneAndDelete({ _id: socialId })
          .then(result => {
            let { _id } = req.user;
            Social.find({ user_id: _id })
              .then(social => {
                res.status(200).json({
                  message: "Deleted Successfully",
                  ...result._doc,
                  socials: social
                });
              })
              .catch(error => serverError(res, error));
          })
          .catch(error => serverError(res, error));
      }
}