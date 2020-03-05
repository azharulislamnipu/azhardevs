import React, { Component, Children } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Title from "../../../../src/ui/title";
import ProgressBar from "react-bootstrap/ProgressBar";
import { loadSkills } from "../../../store/actions/skillsActions";
import ProfessionaSkillItem from "./professionalSkillsItem";
import ProgrammingSkillItem from "./programmingSkillItem";
import LanguageSkillItem from "./languageSkillItem";
import ExtraskillItem from "./extraskills";
class Skills extends Component {
  componentDidMount() {
    this.props.loadSkills();
  }

  render() {
    let { skills } = this.props.skills;

    const extraSkillsItem =
      skills.length > 0 ? (
        skills.map((skill, key) => {
          if (skill.status === "publish") {
            return  <ExtraskillItem extraskills={skill.extra_skills} key={key}/> 
          }
        })
      ) : (
        <span>No Extra Skills Available</span>
      );

    const professionaSkillItem =
      skills.length > 0 ? (
        skills.map((skill, key) => {
          if (skill.status === "publish") {
            return (
              <ProfessionaSkillItem
                professional_skills={skill.professional_skills} key={key}
              />
            );
          }
        })
      ) : (
        <span>No Professional Skills Available</span>
      );

    const programmingSkillItem =
      skills.length > 0 ? (
        skills.map((skill, key) => {
          if (skill.status === "publish") {
            return (
              <ProgrammingSkillItem
                programming_skills={skill.programming_skills} key={key}
              />
            );
          }
        })
      ) : (
        <span>No Programing Skills Available</span>
      );

    const languageSkillItem =
      skills.length > 0 ? (
        skills.map((skill, key) => {
          if (skill.status === "publish") {
            return (
              <LanguageSkillItem language_skills={skill.language_skills} key={key}/>
            );
          }
        })
      ) : (
        <span>No Language Skills Available</span>
      );

    return (
      <section className="skills-area" id='skills'>
        <Container>
          {
            <Title
              title="Skills"
              headline="Technical Skills"
              align="text-right"
              position="justify-content-end"
              style={{ headingcolor: "#1f2235", titlecolor: "#666ce0" }}
            />
          }
          <Row className="skrill_row">
            <Col lg={4} md={6} sm={12}>
              <h4 className="heding">Extra skills</h4>
             {extraSkillsItem}
            </Col>
            <Col lg={8} md={6} sm={12} className="skrill">
              {professionaSkillItem}
            </Col>
          </Row>
          <Row className="skrill_row2">
            <Col lg={6} md={6} sm={12}>
              <h4 className="heding">Programming Language Skills</h4>
              {programmingSkillItem}
            </Col>
            <Col lg={6} md={6} sm={12}>
              <h4 className="heding">language Skills</h4>

              {languageSkillItem}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skill
});

export default connect(mapStateToProps, { loadSkills })(Skills);
