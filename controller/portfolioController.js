const Portfolio = require("../models/Portfolio");
const { serverError, resourceError } = require("../utils/error");
const portfolioValidator = require("../validators/portfolioValidator");
const cloud = require('../utils/cloudinaryConfig');
module.exports = {
  create(req, res, next) {
    const bodydata = JSON.parse(JSON.stringify(req.body));
    let {
      title,
      description,
      type,
      feature_image_name,
      feature_image,
      gellary,
      gellary_image,
      client_name,
      created_by,
      completed_date,
      skills,
      preview_url,
      status
    } = bodydata;

    feature_image = bodydata.feature_image_name;
   

    let validate = portfolioValidator({
      title,
      description,
      type,
      feature_image,
      gellary_image,
      client_name,
      created_by,
      completed_date,
      skills,
      preview_url
    });

    const files = req.files;

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {


      if(files.length > 0){
        let upload_res = cloud.uploads(files);
    
        Promise.all(upload_res)
        .then(result => {
    
                let image_url = result;
    
                let user_id = req.user._id;
                let portfolio = new Portfolio({
                  title,
                  description,
                  type,
                  feature_image,
                  image_url,
                  gellary_image,
                  client_name,
                  created_by,
                  completed_date,
                  skills,
                  preview_url,
                  status,
                  user_id
                });
                portfolio
                  .save()
                  .then(portfo => {
                    res.status(201).json({
                      message: "Portfolio Created Successfully",
                      ...portfo._doc
                    });
                  })
                  .catch(error => serverError(res, error));
    
    
          // res.status(201).json({
          //          message: "Portfolio Created Successfully",
          //          data: result
          //      });
        })
        .catch(error => serverError(res, error))
       }


    
     }
  },

  getAll(req, res, next) {
    Portfolio.find()
      .then(portfolio => {
        if (portfolio.length === 0) {
          res.status(200).json({
            message: "No About Found"
          });
        } else {
          res.status(200).json(portfolio);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res, next) {
    let { portfolioId } = req.params;

    const bodydata = JSON.parse(JSON.stringify(req.body));

    let {
      title,
      description,
      type,
      feature_image_name,
      feature_image,
      current_feature_image,
      gellary,
      gellary_image,
      current_gellary_image_url,
      current_gellary_image,
      client_name,
      created_by,
      completed_date,
      skills,
      preview_url,
      status
    } = bodydata;
    let user_id = req.user._id;

      if(feature_image_name === ''){
        feature_image = current_feature_image;
        let image_url = current_gellary_image_url;
        gellary_image = current_gellary_image;

       
        let validate = portfolioValidator({
          title,
          description,
          type,
          feature_image,
          gellary_image,
          client_name,
          created_by,
          completed_date,
          skills,
          preview_url
        });
    
        if (!validate.isValid) {
          return res.status(400).json(validate.error);
        } else {


      Portfolio.findOneAndUpdate(
        { _id: portfolioId },
        {
          title,
          description,
          type,
          feature_image,
          image_url,
          gellary_image,
          client_name,
          created_by,
          completed_date,
          skills,
          preview_url,
          status,
          user_id
        },
        { new: true }
      )
        .then(result => {
          let { _id } = req.user;
          Portfolio.find({ user_id: _id })
            .then(portfolio => {
              res.status(200).json({
                message: "Update Successfully",
                ...result._doc,
                portfolios: portfolio
              });
            })
            .catch(error => serverError(res, error));
        })
        .catch(error => serverError(res, error));

      }

      }else{
        feature_image = feature_image_name;
        let validate = portfolioValidator({
          title,
          description,
          type,
          feature_image,
          gellary_image,
          client_name,
          created_by,
          completed_date,
          skills,
          preview_url
        });
    
        if (!validate.isValid) {
          return res.status(400).json(validate.error);
        } else {
        const files = req.files;
        if(files.length > 0){
          let upload_res = cloud.uploads(files);
      
          Promise.all(upload_res)
          .then(result => {
      
                  let image_url = result;
      
                  let user_id = req.user._id;
                  Portfolio.findOneAndUpdate(
                    { _id: portfolioId },
                    {
                      title,
                      description,
                      type,
                      feature_image,
                      image_url,
                      gellary_image,
                      client_name,
                      created_by,
                      completed_date,
                      skills,
                      preview_url,
                      status,
                      user_id
                    },
                    { new: true }
                  )
                    .then(result => {
                      let { _id } = req.user;
                      Portfolio.find({ user_id: _id })
                        .then(portfolio => {
                          res.status(200).json({
                            message: "Update Successfully",
                            ...result._doc,
                            portfolios: portfolio
                          });
                        })
                        .catch(error => serverError(res, error));
                    })
                    .catch(error => serverError(res, error));
  
  
          })
          .catch(error => serverError(res, error))
         }
        }
  
      }




    
  },

  removePortfolio(req, res) {
    let { portfolioId } = req.params;

    Portfolio.findOneAndDelete({ _id: portfolioId })
      .then(result => {
        let { _id } = req.user;
        Portfolio.find({ user_id: _id })
          .then(portfolio => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              portfolios: portfolio
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
