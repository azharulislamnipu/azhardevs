import React from "react";
import CountUp from "react-countup";
import IconGenerate from "../../../ui";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
const ProfessionaSkillItem = props => {
  return (
    <div className="single-skille">
      {props.professional_skills.map((professional_skill, index) => {
        let {
          prof_progress_title,
          prof_progress
        } = professional_skill;
        return (
          <div key={index}>
            <h4 className="text-uppercase">{prof_progress_title}</h4>

            <div className={`progress-wrrap  percent-${prof_progress}`}>
              <div className="progress-title">{prof_progress}%</div>
              <ProgressBar now={prof_progress} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProfessionaSkillItem;
