const Logo = require("../models/Logo");
const { serverError, resourceError } = require("../utils/error");
const logoValidator = require("../validators/logoValidator");
const cloud = require("../utils/cloudinaryConfig");

module.exports = {
  create(req, res, next) {
    const bodydata = JSON.parse(JSON.stringify(req.body));

    let { logo_name, status } = bodydata;

    console.log(bodydata);
    console.log(req.file);

    let validate = logoValidator({
      logo_name
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
      cloud
        .uploadImage(req.file.path)
        .then(result => {
          let user_id = req.user._id;
          let logo_url = result.secure_url;
          let logos = new Logo({
            logo_name,
            logo_url,
            status,
            user_id
          });
          logos.save()
            .then(result => {
              let { _id } = req.user;
              Logo.find({ user_id: _id })
                .then(logo => {
                  res.status(200).json({
                    message: "Logo Created Successfully",
                    ...result._doc,
                    logos: logo
                  });
                })
                .catch(error => serverError(res, error));
            })
            .catch(error => serverError(res, error));
        })
        .catch(error => serverError(res, error));
    }
  },

  getAll(req, res, next) {
    Logo.find()
      .then(logo => {
        if (logo.length === 0) {
          res.status(200).json({
            message: "Logo Not Found"
          });
        } else {
          res.status(200).json(logo);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res, next) {
    let { logoId } = req.params;

    const bodydata = JSON.parse(JSON.stringify(req.body));

    let { logo_name, logo, current_logo_name, current_logo_url, status } = bodydata;

    let user_id = req.user._id;

    if (logo === "undefined") {
      logo_name = current_logo_name;
    }

    let validate = logoValidator({
      logo_name
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
  
      if (logo == "undefined") {
        logo_name = current_logo_name;
        let  logo_url  = current_logo_url;
              Logo.findOneAndUpdate(
                { _id: logoId },
                {
                  logo_name,
                  logo_url,
                  status,
                  user_id
                },
                { new: true }
              )
                .then(result => {
                  let { _id } = req.user;
                  Logo.find({ user_id: _id })
                    .then(logo => {
                      res.status(200).json({
                        message: "Update Successfully",
                        ...result._doc,
                        logos: logo
                      });
                    })
                    .catch(error => serverError(res, error));
                })
                .catch(error => serverError(res, error));
      } else {


        cloud
        .uploadImage(req.file.path)
        .then(result => {
          let  logo_url  = result.secure_url;
                Logo.findOneAndUpdate(
                  { _id: logoId },
                  {
                    logo_name,
                    logo_url,
                    status,
                    user_id
                  },
                  { new: true }
                )
                  .then(result => {
                    let { _id } = req.user;
                    Logo.find({ user_id: _id })
                      .then(logo => {
                        res.status(200).json({
                          message: "Update Successfully",
                          ...result._doc,
                          logos: logo
                        });
                      })
                      .catch(error => serverError(res, error));
                  })
                  .catch(error => serverError(res, error));


        })
        .catch(error => serverError(res, error));

      }

    }

  
  },

  remove(req, res) {
    let { logoId } = req.params;

    Logo.findOneAndDelete({ _id: logoId })
      .then(result => {
        let { _id } = req.user;
        Logo.find({ user_id: _id })
          .then(logo => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              logos: logo
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
