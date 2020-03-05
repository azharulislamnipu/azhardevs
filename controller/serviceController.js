const Service = require("../models/Service");
const { serverError, resourceError } = require("../utils/error");
const serviceValidator = require("../validators/serviceValidator");
module.exports = {
  create(req, res, next) {
    let {title,
        icon,
        description,
        status } = req.body;
    let user_id = req.user._id;
    let validate = serviceValidator({ title,
        icon,
        description
    });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
      let services = new Service({
        title,
        icon,
        description,
        status,
        user_id
      });
      services
        .save()
        .then(service => {
          res.status(201).json({
            message: "Service Created Successfully",
            ...service._doc
          });
        })
        .catch(error => serverError(res, error));
    }
  },

  getAll(req, res, next) {
    // let { _id } = req.user;
    Service.find()
      .then(service => {
        if (service.length === 0) {
          res.status(200).json({
            message: "No counter Found"
          });
        } else {
          res.status(200).json(service);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res) {
    let { serviceId } = req.params;

    console.log(serviceId);

    let { title,
      icon,
      description,
      status } = req.body;

    let user_id = req.user._id;
    let validate = serviceValidator({ title,
      icon,
      description });

    if (!validate.isValid) {
        return res.status(400).json(validate.error);
      } else { 
      Service.findOneAndUpdate(
      { _id: serviceId },
      { title,
        icon,
        description,
        status,
        user_id},
      { new: true }
    )
      .then(result => {
        let { _id } = req.user;
        Service.find({ user_id: _id })
          .then(service => {
            res.status(200).json({
              message: "Update Successfully",
              ...result._doc,
              services: service
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));

    }
  },

  removeService(req, res) {
    let { serviceId } = req.params;

    Service.findOneAndDelete({ _id: serviceId })
      .then(result => {
        let { _id } = req.user;
        Service.find({ user_id: _id })
          .then(service => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              services: service
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
