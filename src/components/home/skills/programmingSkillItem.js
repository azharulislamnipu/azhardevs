import React from "react";
import CountUp from "react-countup";
import IconGenerate from "../../../ui";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
const ProgrammingSkillItem = props => {
  //   console.log(props.programming_skills);
  return (
    <div className="single-skille">
      {props.programming_skills.map((programming_skill, index) => {
        let {
          programming_lang_title,
          programming_lang_progress
        } = programming_skill;
        return (
          <div key={index}>
            <h4 className="text-uppercase">{programming_lang_title}</h4>

            <div className={`progress-wrrap  percent-${programming_lang_progress}`}>
              <div className="progress-title">{programming_lang_progress}%</div>
              <ProgressBar now={programming_lang_progress} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProgrammingSkillItem;
