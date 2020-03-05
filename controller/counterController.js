const Counter = require("../models/Counter");
const { serverError, resourceError } = require("../utils/error");
const counterValidator = require("../validators/counterValidator");
module.exports = {
  create(req, res, next) {
    let { title, counter_number, counter_icon, duration, status } = req.body;
    let user_id = req.user._id;
    let validate = counterValidator({ title, counter_number, counter_icon, duration });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {
      let counters = new Counter({
        title,
        counter_number,
        counter_icon,
        duration,
        status,
        user_id
      });
      counters
        .save()
        .then(counts => {
          res.status(201).json({
            message: "Counter Created Successfully",
            ...counts._doc
          });
        })
        .catch(error => serverError(res, error));
    }
  },

  getAll(req, res, next) {
    // let { _id } = req.user;
    Counter.find()
      .then(counter => {
        if (counter.length === 0) {
          res.status(200).json({
            message: "No counter Found"
          });
        } else {
          res.status(200).json(counter);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res) {
    let { counterId } = req.params;

    let { title, counter_number, counter_icon, duration, status } = req.body;

    let user_id = req.user._id;
    let validate = counterValidator({ title, counter_number, counter_icon, duration });

    if (!validate.isValid) {
        return res.status(400).json(validate.error);
      } else { 
    Counter.findOneAndUpdate(
      { _id: counterId },
      { title,
        counter_number,
        counter_icon,
        duration,
        status,
        user_id},
      { new: true }
    )
      .then(result => {
        let { _id } = req.user;
        Counter.find({ user_id: _id })
          .then(counter => {
            res.status(200).json({
              message: "Update Successfully",
              ...result._doc,
              counters: counter
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));

    }
  },

  removeCounter(req, res) {
    let { counterId } = req.params;

    Counter.findOneAndDelete({ _id: counterId })
      .then(result => {
        let { _id } = req.user;
        Counter.find({ user_id: _id })
          .then(counter => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              counters: counter
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
