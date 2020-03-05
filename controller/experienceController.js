const Experience = require("../models/Experience");
const { serverError, resourceError } = require("../utils/error");
const experienceValidator = require("../validators/experienceValidator");
module.exports = {
  create(req, res, next) {
    let {
      company_name,
      icon,
      designation,
      start_date,
      end_date,
      status
    } = req.body;
    let user_id = req.user._id;
    let validate = experienceValidator({
      company_name,
      icon,
      designation
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
      let experiences = new Experience({
        company_name,
        icon,
        designation,
        start_date,
        end_date,
        status,
        user_id
      });
      experiences
        .save()
        .then(experience => {
          res.status(201).json({
            message: "Counter Created Successfully",
            ...experience._doc
          });
        })
        .catch(error => serverError(res, error));
    }
  },

  getAll(req, res, next) {
    // let { _id } = req.user;
    Experience.find()
      .then(experience => {
        if (experience.length === 0) {
          res.status(200).json({
            message: "No counter Found"
          });
        } else {
          res.status(200).json(experience);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res) {
    let { experienceId } = req.params;
    let {
        company_name,
        icon,
        designation,
        start_date,
        end_date,
        status
      } = req.body;
      let user_id = req.user._id;
      let validate = experienceValidator({
        company_name,
        icon,
        designation
      });


    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
        Experience.findOneAndUpdate(
        { _id: experienceId },
        {  company_name,
            icon,
            designation,
            start_date,
            end_date,
            status,
            user_id },
        { new: true }
      )
        .then(result => {
          let { _id } = req.user;
          Experience.find({ user_id: _id })
            .then(experience => {
              res.status(200).json({
                message: "Update Successfully",
                ...result._doc,
                experiences: experience
              });
            })
            .catch(error => serverError(res, error));
        })
        .catch(error => serverError(res, error));
    }
  },

  remove(req, res) {
    let { experienceId } = req.params;

    Experience.findOneAndDelete({ _id: experienceId })
      .then(result => {
        let { _id } = req.user;
        Experience.find({ user_id: _id })
          .then(experience => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              experiences: experience
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
