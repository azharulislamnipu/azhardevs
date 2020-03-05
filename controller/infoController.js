const Info = require("../models/Info");
const { serverError, resourceError } = require("../utils/error");
const infoValidator = require("../validators/infoValidator");
module.exports = {
    create(req, res, next) {
        let { title, info_icon, info_name, status } = req.body;
        let user_id = req.user._id;
        let validate = infoValidator({ title, info_icon });

        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        } else {
            let infos = new Info({ title, info_icon, info_name, status, user_id });
            infos.save()
                .then(info => {
                    res.status(201).json({
                        message: "Info Created Successfully",
                        ...info._doc
                    });
                })
                .catch(error => serverError(res, error));
        }
    },

    getAll(req, res, next) {
        // let { _id } = req.user;
        Info.find()
            .then(info => {
                if (info.length === 0) {
                    res.status(200).json({
                        message: "No Info Found"
                    });
                } else {
                    res.status(200).json(info);
                }
            })
            .catch(error => serverError(res, error));
    },

    update(req, res) {
        let { infoId } = req.params;

        let { title, info_icon, info_name, status } = req.body;
        let user_id = req.user._id;
        let validate = infoValidator({ title, info_icon });

        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        } else {
            Info.findOneAndUpdate(
                { _id: infoId },
                {title, info_icon, info_name, status, user_id},
                { new: true }
            )
                .then(result => {
                    let { _id } = req.user;
                    Info.find({ user_id: _id })
                        .then(info => {
                            res.status(200).json({
                                message: "Update Successfully",
                                ...result._doc,
                                infos: info
                            });
                        })
                        .catch(error => serverError(res, error));
                })
                .catch(error => serverError(res, error));

        }
    },

    removeInfo(req, res) {
        let { infoId } = req.params;

        Info.findOneAndDelete({ _id: infoId })
            .then(result => {
                let { _id } = req.user;
                Info.find({ user_id: _id })
                    .then(info => {
                        res.status(200).json({
                            message: "Deleted Successfully",
                            ...result._doc,
                            infos: info
                        });
                    })
                    .catch(error => serverError(res, error));
            })
            .catch(error => serverError(res, error));
    }
};
