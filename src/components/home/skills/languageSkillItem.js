import React from "react";
import CountUp from "react-countup";
import IconGenerate from "../../../ui";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
const LanguageSkillItem = props => {
  return (
    <div className="single-skille">
      {props.language_skills.map((language_skill, index) => {
        let { lang_title, lang_progress } = language_skill;
        return (
          <div key={index}>
            <h4 className="text-uppercase">{lang_title}</h4>

            <div className={`progress-wrrap percent-${lang_progress}`}>
              <div className="progress-title">{lang_progress}%</div>
              <ProgressBar now={lang_progress} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default LanguageSkillItem;
