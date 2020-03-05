import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSkills } from "../../../store/actions/skillsActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";

class UpdateSkills extends Component {


    constructor(props) {
        super(props);
      
    this.state = {
      extra_skills: [''],
      professional_skills: [{ index: Math.random(), prof_progress_title: "" , prof_progress:""}],
      programming_skills: [{ index: Math.random(), programming_lang_title: "", programming_lang_progress:""}],
      language_skills: [{ index: Math.random(), lang_title: "" , lang_progress:""}],
      status: "publish",
      error: {}
    };
   
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }

   
  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.skills.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.skills.error
      };
    }
    return null;
  }

  componentDidMount() {
  
 
    this.setState({
  
      extra_skills: this.props.skills.error.extra_skill?  this.state.extra_skills : this.props.skill.extra_skills,
      professional_skills: this.props.skill.professional_skills,
      programming_skills: this.props.skill.programming_skills,
      language_skills: this.props.skill.language_skills,
      status: this.props.skill.status
    });
  }



  addProfeClick = () => {
    this.setState(prevState => ({ 
      professional_skills: [...prevState.professional_skills, { index: Math.random(), prof_progress_title: "", prof_progress:"" }]
    }))
  }
  
  handleChangedProfe = (i, e) => {
    const { name, value } = e.target;
    let professional_skills = [...this.state.professional_skills];
    professional_skills[i] = {...professional_skills[i], [name]: value};
    this.setState({ professional_skills });
  }
  removeClickProfe = i => {
  let professional_skills = [...this.state.professional_skills];
  if( i > 0){
    professional_skills.splice(i, 1);
    this.setState({ professional_skills });
  }
  
  }
  
  createProfessionalUI = (error) => {
    return this.state.professional_skills.map((el, i) => (
    
            <tr key={i}>
            <td>   
               <Form.Control type="text"  className='d-inline-block' name="prof_progress_title" placeholder="Professional Progress Title" value={el.prof_progress_title ||''}  onChange={this.handleChangedProfe.bind(this, i)}/>
               {error.prof_progress_title && (
                        <span
                          className={
                            error.prof_progress_title
                              ? "invalid-feedback d-block"
                              : "invalid-feedback"
                          }
                        >
                          {error.prof_progress_title}
                        </span>
                      )}
          </td>
   
      <td>
      <Form.Control type="text"  className='d-inline-block' name="prof_progress" placeholder="Professional Progress " value={el.prof_progress ||''}  onChange={this.handleChangedProfe.bind(this, i)}/>
      {error.prof_progress && (
                        <span
                          className={
                            error.prof_progress
                              ? "invalid-feedback d-block"
                              : "invalid-feedback"
                          }
                        >
                          {error.prof_progress}
                        </span>
                      )}
      </td>
      <td>     
  
                {
               i ===0?<button onClick={this.addProfeClick.bind(this)} type="button" className="btn btn-primary w-100 text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
              : <button type="button" className="btn btn-danger w-100" onClick={this.removeClickProfe.bind(this, i)} ><i className="fa fa-close" aria-hidden="true"></i></button>
              }
  
       </td>
            </tr>
            
    ))
  }
  
  
  addProgClick = () => {
    this.setState(prevState => ({ 
      programming_skills: [...prevState.programming_skills, { index: Math.random(), programming_lang_title: "", programming_lang_progress:"" }]
    }))
  }
  
  handleChangedProg = (i, e) => {
    const { name, value } = e.target;
    let programming_skills = [...this.state.programming_skills];
    programming_skills[i] = {...programming_skills[i], [name]: value};
    this.setState({ programming_skills });
  }
  removeClickProg = i => {
  let programming_skills = [...this.state.programming_skills];
  if( i > 0){
    programming_skills.splice(i, 1);
    this.setState({ programming_skills });
  }
  
  }
  
  createProgrammingUI = (error) => {
    return this.state.programming_skills.map((el, i) => (
    
            <tr key={i}>
            <td>   
               <Form.Control type="text"  className='d-inline-block' name="programming_lang_title" placeholder="Programming language Progress Title" value={el.programming_lang_title ||''}  onChange={this.handleChangedProg.bind(this, i)}/>
               {error.programming_lang_title && (
                        <span
                          className={
                            error.programming_lang_title
                              ? "invalid-feedback d-block"
                              : "invalid-feedback"
                          }
                        >
                          {error.programming_lang_title}
                        </span>
                      )}
          </td>

      <td>
      <Form.Control type="text" className='d-inline-block' name="programming_lang_progress" placeholder="Programming language Progress " value={el.programming_lang_progress ||''}  onChange={this.handleChangedProg.bind(this, i)}/>
      {error.programming_lang_progress && (
                        <span
                          className={
                            error.programming_lang_progress
                              ? "invalid-feedback d-block"
                              : "invalid-feedback"
                          }
                        >
                          {error.programming_lang_progress}
                        </span>
                      )}
      </td>
      <td>     
  
                {
               i ===0?<button onClick={this.addProgClick.bind(this)} type="button" className="btn btn-primary w-100 text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
              : <button type="button" className="btn btn-danger w-100" onClick={this.removeClickProg.bind(this, i)} ><i className="fa fa-close" aria-hidden="true"></i></button>
              }
  
       </td>
            </tr>
            
    ))
  }
  
  addLangClick = () => {
    this.setState(prevState => ({ 
      language_skills: [...prevState.language_skills, { index: Math.random(), lang_title: "", lang_progress:"" }]
    }))
  }
  
  handleChangedLang= (i, e) => {
    const { name, value } = e.target;
    let language_skills = [...this.state.language_skills];
    language_skills[i] = {...language_skills[i], [name]: value};
    this.setState({ language_skills });
  }
  removeClickLang = i => {
  let language_skills = [...this.state.language_skills];
  if( i > 0){
    language_skills.splice(i, 1);
    this.setState({ language_skills });
  }
  
  }
  
  createLanguageUI = (error) => {
    return this.state.language_skills.map((el, i) => (
    
            <tr key={i}>
            <td>   
               <Form.Control type="text"  className='d-inline-block' name="lang_title" placeholder="Language Progress Title" value={el.lang_title ||''}  onChange={this.handleChangedLang.bind(this, i)}/>
               {error.lang_title && (
                        <span
                          className={
                            error.lang_title
                              ? "invalid-feedback d-block"
                              : "invalid-feedback"
                          }
                        >
                          {error.lang_title}
                        </span>
                      )}
          </td>
      
      <td>
      <Form.Control type="text"  className='d-inline-block' name="lang_progress" placeholder="language Progress " value={el.lang_progress ||''}  onChange={this.handleChangedLang.bind(this, i)}/>
      {error.lang_progress && (
                        <span
                          className={
                            error.lang_progress
                              ? "invalid-feedback d-block"
                              : "invalid-feedback"
                          }
                        >
                          {error.lang_progress}
                        </span>
                      )}
      </td>
      <td>     
  
                {
               i ===0?<button onClick={this.addLangClick.bind(this)} type="button" className="btn btn-primary w-100 text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
              : <button type="button" className="btn btn-danger w-100" onClick={this.removeClickLang.bind(this, i)} ><i className="fa fa-close" aria-hidden="true"></i></button>
              }
  
       </td>
            </tr>
            
    ))
  }
  
  
  addExtraskills = e => {
  
    this.setState({ extra_skills: [...this.state.extra_skills, ""] })
  }
  
  chaneExtraskillsValue = (event, index) => {
    this.state.extra_skills[index] = event.target.value;
    this.setState({ extra_skills: this.state.extra_skills });
  }
  removeExtraskills = (sidx) => {
    if (sidx > 0) {
      this.setState({
        extra_skills: this.state.extra_skills.filter((s, idx) => idx !== sidx)
      });
    }
  
  };

    

  addExtraskills = e => {
    
    this.setState({ extra_skills: [...this.state.extra_skills, ""] })
  }
  
  chaneExtraskillsValue = (event, index) => {
    this.state.extra_skills[index] = event.target.value;
    this.setState({ extra_skills: this.state.extra_skills });
  }
  removeExtraskills = (sidx) => {
    if (sidx > 0) {
      this.setState({
        extra_skills: this.state.extra_skills.filter((s, idx) => idx !== sidx)
      });
    }
  
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleChange(e) {
    this.setState({
      status: e.target.value
    });
  }

  submitHandler = event => {
    event.preventDefault();

    // console.log(this.state);
     this.props.updateSkills(this.props.skill._id, this.state, this.props.addFlashMessage, this.props);
  };


  render() {
     
    let { extra_skills, professional_skills, programming_skills, language_skills, status , error} = this.state;

    return (
      <Modal
      show={this.props.show} onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark"> Update Skills</h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}>
          <Modal.Body>
          <Form.Group controlId="extra_skills">
                    <Form.Label>Extra Skills</Form.Label>
                    <table className='w-100' >
                      <tbody>
                    {extra_skills.map((value, index) => {
                      return (

                        <tr key={index}>
                         <td className='w-100'>

                         <Form.Control type="text"  className=' d-inline-block' placeholder='Enter Your Skill Name' value={value} onChange={(e) => this.chaneExtraskillsValue(e, index)} />
                       
                         </td>
                         <td>
                         {
                            index ===0?<button onClick={(e) => { e.preventDefault(); this.addExtraskills(e) }} type="button" className="btn btn-primary ml-2"><i className="fa fa-plus" aria-hidden="true"></i></button>
            : <button className="btn btn-danger ml-2" onClick={() => this.removeExtraskills(index)} ><i className="fa fa-close" aria-hidden="true"></i></button>
            }
                         </td>
                       </tr>
                      )
                    })}
                    </tbody> 
                       </table>
                  
                  </Form.Group>

                  <Form.Group controlId="professional_skills">
                    <Form.Label>Professional Skills</Form.Label>

                    <table className='w-100' >
                    <tbody>
                    {this.createProfessionalUI(error)}    
                    </tbody>    
                    </table>
                </Form.Group>

                <Form.Group controlId="programing_skills">
                    <Form.Label>Programming Language Skills</Form.Label>

                    <table className='w-100' >
                    <tbody>
                    {this.createProgrammingUI(error)}  
                    </tbody>      
                    </table>
                </Form.Group>

                <Form.Group controlId="language_skills">
                    <Form.Label>Language Skills</Form.Label>

                    <table className='w-100' >
                    <tbody>
                    {this.createLanguageUI(error)} 
                    </tbody>       
                    </table>
                </Form.Group>

            <Form.Group controlId="status.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={status}  onChange={this.handleChange.bind(this)}>
                <option value="publish">Publish</option>
                <option value="revoke">Revoke</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-dark ml-2" type="submit">
              Update
            </button>
            <button className="btn btn-danger" onClick={this.props.onHide}>
              Close
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skill
});

export default connect(mapStateToProps, { updateSkills, addFlashMessage })(UpdateSkills);