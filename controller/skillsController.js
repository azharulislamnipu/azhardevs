const Skills = require("../models/Skills");
const { serverError, resourceError } = require("../utils/error");
const skillsValidator = require("../validators/skillsValidator");
const programingValidator = require("../validators/programingValidator");
const languageValidator = require("../validators/languageValidator");
module.exports = {

  create(req, res, next) {
    let { extra_skills, professional_skills,  programming_skills, language_skills, learning_skills, status } = req.body;
    let user_id = req.user._id;

    let validate, progValidate, langValidate;

    for (var i = 0; i < professional_skills.length; i++) {
      let {index, prof_progress_title, prof_progress_name, prof_progress } = professional_skills[i];
      validate = skillsValidator({
        prof_progress_title, prof_progress_name, prof_progress
      });
  }

  for (var i = 0; i < programming_skills.length; i++) {
    let {index, programming_lang_title, programming_lang_name, programming_lang_progress } = programming_skills[i];
    progValidate = programingValidator({
      programming_lang_title, programming_lang_name, programming_lang_progress
    });
}

for (var i = 0; i < language_skills.length; i++) {
  let {index, lang_title, lang_name, lang_progress } = language_skills[i];
  langValidate = languageValidator({
    lang_title, lang_name, lang_progress
  });
}

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    }else if(!progValidate.isValid){
      res.status(400).json(progValidate.error);
    }else if(!langValidate.isValid){
      res.status(400).json(langValidate.error);
    }else {
      let skills = new Skills({
        extra_skills,
        professional_skills,
        programming_skills,
        language_skills,
        status,
        user_id
      });
      skills
        .save()
        .then(skill => {
          res.status(201).json({
            message: "Skills Created Successfully",
            ...skill._doc
          });
        })
        .catch(error => serverError(res, error));
      }
    
  },

  getAll(req, res, next) {
    // let { _id } = req.user;
    Skills.find()
      .then(skills => {
        if (skills.length === 0) {
          res.status(200).json({
            message: "No counter Found"
          });
        } else {
          res.status(200).json(skills);
        }
      })
      .catch(error => serverError(res, error));
  },

  update(req, res) {
    let { skillsId } = req.params;

    let { extra_skills, professional_skills,  programming_skills, language_skills, status } = req.body;
    let user_id = req.user._id;

    let validate, progValidate, langValidate;

    for (var i = 0; i < professional_skills.length; i++) {
      let {index, prof_progress_title, prof_progress_name, prof_progress } = professional_skills[i];
      validate = skillsValidator({
        prof_progress_title, prof_progress_name, prof_progress
      });
  }

  for (var i = 0; i < programming_skills.length; i++) {
    let {index, programming_lang_title, programming_lang_name, programming_lang_progress } = programming_skills[i];
    progValidate = programingValidator({
      programming_lang_title, programming_lang_name, programming_lang_progress
    });
}

for (var i = 0; i < language_skills.length; i++) {
  let {index, lang_title, lang_name, lang_progress } = language_skills[i];
  langValidate = languageValidator({
    lang_title, lang_name, lang_progress
  });
}

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    }else if(!progValidate.isValid){
      res.status(400).json(progValidate.error);
    }else if(!langValidate.isValid){
      res.status(400).json(langValidate.error);
    }else {
      Skills.findOneAndUpdate(
      { _id: skillsId },
      { extra_skills,
        professional_skills,
        programming_skills,
        language_skills,
        status,
        user_id},
      { new: true }
    )
      .then(result => {
        let { _id } = req.user;
        Skills.find({ user_id: _id })
          .then(skills => {
            res.status(200).json({
              message: "Update Successfully",
              ...result._doc,
              skills: skills
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));

    }
  },

  remove(req, res) {
    let { skillsId } = req.params;

    Skills.findOneAndDelete({ _id: skillsId })
      .then(result => {
        let { _id } = req.user;
        Skills.find({ user_id: _id })
          .then(skills => {
            res.status(200).json({
              message: "Deleted Successfully",
              ...result._doc,
              skills: skills
            });
          })
          .catch(error => serverError(res, error));
      })
      .catch(error => serverError(res, error));
  }
};
