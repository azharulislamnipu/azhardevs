const Contact = require("../models/Contact");
const nodemailer = require('nodemailer');
const { serverError, resourceError } = require("../utils/error");
 const contactValidator = require("../validators/contactValidator");
module.exports = {
  create(req, res, next) {
    let { fullname, email, organigation, subject, consult_date, budget, description, phone } = req.body;
    let status = 'unapprove';
    let replay_message = 'Not Yet';
    let validate = contactValidator({ fullname, email, subject, consult_date, budget, description, replay_message, phone });


    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    } else {

        let admin_mail =  process.env.ADMIN_MAIL;
        let admin_pass =  process.env.ADMIN_PASS;
        let host =  process.env.MAILHOST;
        let port =  process.env.MAILPORT;

        let transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: true,
            requireTLS: true,
            auth: {
              user: admin_mail,
              pass: admin_pass
            }
          });
          
          let mailOptions = {
            from: email,
            to: admin_mail,
            subject: subject,
            text: description
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return resourceError(res, 'mail Not send');
            } else {

                let contacts = new Contact({
                    fullname,
                    email,
                    subject,
                    organigation,
                    consult_date,
                    budget,
                    description,
                    replay_message, 
                    phone,
                    status
                  });
                  contacts
                    .save()
                    .then(contact => {
                      res.status(201).json({
                        message: "Thank you for getting in touch!",
                        ...contact._doc
                      });
                    })
                    .catch(error => serverError(res, error));


            }
          });
      
    }
  },

  getAll(req, res, next) {
    Contact.find()
      .then(contact => {
        if (contact.length === 0) {
          res.status(200).json({
            message: "No Contact Found"
          });
        } else {
          res.status(200).json(contact);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res) {
    let { contactId } = req.params;
    let { fullname, email, organigation, subject, consult_date, budget, description, replay_message, phone, status } = req.body;
   
    let validate = contactValidator({ fullname, email, organigation, subject, consult_date, budget, description, replay_message, phone, status });

    if (!validate.isValid) {
        return res.status(400).json(validate.error);
      } else { 

        let admin_mail =  process.env.ADMIN_MAIL;
        let admin_pass =  process.env.ADMIN_PASS;
        let host =  process.env.MAILHOST;
        let port =  process.env.MAILPORT;

        let transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: false,
            requireTLS: true,
            auth: {
              user: admin_mail,
              pass: admin_pass
            }
          });
          
          let mailOptions = {
            from: admin_mail,
            to: email,
            subject: subject+' Your Proposal is '+status,
            text: replay_message
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return resourceError(res, 'mail Not send');
            } else {


              Contact.findOneAndUpdate(
                { _id: contactId },
                { fullname, email, organigation, subject, consult_date, budget, description, replay_message, phone, status},
                { new: true }
              )
                .then(result => {
                  Contact.find()
                    .then(contact => {
                      res.status(200).json({
                        message: "Replay Successfully",
                        ...result._doc,
                        contacts: contact
                      });
                    })
                    .catch(error => serverError(res, error));
                })
                .catch(error => serverError(res, error));
              

            }
          });
   

    }
  },

removeContact(req, res) {
    let { contactId } = req.params;
    Contact.findOneAndDelete({ _id: contactId })
      .then(result => {
        Contact.find()
          .then(contact => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              contacts: contact
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
