import React from "react";

const ExtraskillItem = props => {

  return (
    <ul className="extra_skills">
      {props.extraskills.map((extraskill, index) => {

        return (
          <li className="single-skille" key={index}>
            {extraskill}
          </li>
        );
      })}
    </ul>
  );
};
export default ExtraskillItem;
