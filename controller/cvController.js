const Cv = require("../models/Cv");
const { serverError, resourceError } = require("../utils/error");
const cvValidator = require("../validators/cvValidator");
const cloud = require("../utils/cloudinaryConfig");

module.exports = {
  create(req, res, next) {
    const bodydata = JSON.parse(JSON.stringify(req.body));

    let { cv_name, status } = bodydata;

    let validate = cvValidator({
      cv_name
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
      cloud
        .uploadImage(req.file.path)
        .then(result => {
          let user_id = req.user._id;
          let cv_url = result.secure_url;
          let cvs = new Cv({
            cv_name,
            cv_url,
            status,
            user_id
          });
          cvs.save()
            .then(result => {
              let { _id } = req.user;
              Cv.find({ user_id: _id })
                .then(cv => {
                  res.status(200).json({
                    message: "CV Created Successfully",
                    ...result._doc,
                    cvs: cv
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
    Cv.find()
      .then(cv => {
        if (cv.length === 0) {
          res.status(200).json({
            message: "No About Found"
          });
        } else {
          res.status(200).json(cv);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res, next) {
    let { cvId } = req.params;

    const bodydata = JSON.parse(JSON.stringify(req.body));

    let { cv_name, cv, current_cv_name, current_cv_url, status } = bodydata;

    let user_id = req.user._id;

    if (cv === "undefined") {
      cv_name = current_cv_name;
    }

    let validate = cvValidator({
      cv_name
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
  
      if (cv == "undefined") {
        cv_name = current_cv_name;
        let  cv_url  = current_cv_url;
              Cv.findOneAndUpdate(
                { _id: cvId },
                {
                  cv_name,
                  cv_url,
                  status,
                  user_id
                },
                { new: true }
              )
                .then(result => {
                  let { _id } = req.user;
                  Cv.find({ user_id: _id })
                    .then(cv => {
                      res.status(200).json({
                        message: "Update Successfully",
                        ...result._doc,
                        cvs: cv
                      });
                    })
                    .catch(error => serverError(res, error));
                })
                .catch(error => serverError(res, error));
      } else {


        cloud
        .uploadImage(req.file.path)
        .then(result => {
          let  cv_url  = result.secure_url;
                Cv.findOneAndUpdate(
                  { _id: cvId },
                  {
                    cv_name,
                    cv_url,
                    status,
                    user_id
                  },
                  { new: true }
                )
                  .then(result => {
                    let { _id } = req.user;
                    Cv.find({ user_id: _id })
                      .then(cv => {
                        res.status(200).json({
                          message: "Update Successfully",
                          ...result._doc,
                          cvs: cv
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
    let { cvId } = req.params;

    Cv.findOneAndDelete({ _id: cvId })
      .then(result => {
        let { _id } = req.user;
        Cv.find({ user_id: _id })
          .then(cv => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              cvs: cv
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
