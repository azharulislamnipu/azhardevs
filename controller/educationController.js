const Education = require("../models/Education");
const { serverError, resourceError } = require("../utils/error");
const educationValidator = require("../validators/educationValidator");
module.exports = {
  create(req, res, next) {
    let {
      organization_name,
      program_title,
      description,
      start_date,
      end_date,
      status
    } = req.body;
    let user_id = req.user._id;
    let validate = educationValidator({
      organization_name,
      program_title,
      description
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
      let educations = new Education({
        organization_name,
        program_title,
        description,
        start_date,
        end_date,
        status,
        user_id
      });
      educations
        .save()
        .then(education => {
          res.status(201).json({
            message: "Counter Created Successfully",
            ...education._doc
          });
        })
        .catch(error => serverError(res, error));
    }
  },

  getAll(req, res, next) {
    // let { _id } = req.user;
    Education.find()
      .then(education => {
        if (education.length === 0) {
          res.status(200).json({
            message: "No counter Found"
          });
        } else {
          res.status(200).json(education);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res) {
    let { educationId } = req.params;
    let {
      organization_name,
      program_title,
      description,
      start_date,
      end_date,
      status
    } = req.body;
    let user_id = req.user._id;
    let validate = educationValidator({
      organization_name,
      program_title,
      description
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
        Education.findOneAndUpdate(
        { _id: educationId },
        { organization_name,
          program_title,
          description,
          start_date,
          end_date,
          status,
            user_id },
        { new: true }
      )
        .then(result => {
          let { _id } = req.user;
          Education.find({ user_id: _id })
            .then(education => {
              res.status(200).json({
                message: "Update Successfully",
                ...result._doc,
                educations: education
              });
            })
            .catch(error => serverError(res, error));
        })
        .catch(error => serverError(res, error));
    }
  },

  remove(req, res) {
    let { educationId } = req.params;

    Education.findOneAndDelete({ _id: educationId })
      .then(result => {
        let { _id } = req.user;
        Education.find({ user_id: _id })
          .then(education => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              educations: education
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
