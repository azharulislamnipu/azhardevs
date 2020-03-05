import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createSkills } from "../../../store/actions/skillsActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";

class Skills extends Component {
  constructor(props) {
    super();

    this.state = {
      extra_skills: [''],
      professional_skills: [{ index: Math.random(), prof_progress_title: "", prof_progress:""}],
      programming_skills: [{ index: Math.random(), programming_lang_title: "" , programming_lang_progress:""}],
      language_skills: [{ index: Math.random(), lang_title: "" , lang_progress:""}],
      status: "publish",
      error: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleChangedProfe = this.handleChangedProfe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
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
          <td className="w-50">   
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

    <td className="w-50">
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
            : <button type="button" className="btn btn-danger " onClick={this.removeClickProfe.bind(this, i)} ><i className="fa fa-close" aria-hidden="true"></i></button>
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
          <td  className="w-50">   
             <Form.Control type="text"   className='d-inline-block' name="programming_lang_title" placeholder="Programming language Progress Title" value={el.programming_lang_title ||''}  onChange={this.handleChangedProg.bind(this, i)}/>
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

    <td className="w-50">
    <Form.Control type="text"    className='d-inline-block' name="programming_lang_progress" placeholder="Programming language Progress " value={el.programming_lang_progress ||''}  onChange={this.handleChangedProg.bind(this, i)}/>
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
            : <button type="button" className="btn btn-danger" onClick={this.removeClickProg.bind(this, i)} ><i className="fa fa-close" aria-hidden="true"></i></button>
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
          <td className="w-50">   
             <Form.Control type="text"   className='d-inline-block' name="lang_title" placeholder="Language Progress Title" value={el.lang_title ||''}  onChange={this.handleChangedLang.bind(this, i)}/>
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
    <td className="w-50">
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
            : <button type="button" className="btn btn-danger" onClick={this.removeClickLang.bind(this, i)} ><i className="fa fa-close" aria-hidden="true"></i></button>
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

  handleChange = e => {
    this.setState({
      status: e.target.value
    });
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandler = event => {
    event.preventDefault();

    let { extra_skills, professional_skills, programming_skills,language_skills, status } = this.state;

    this.props.createSkills({ extra_skills, professional_skills, programming_skills, language_skills, status}, addFlashMessage, this.props.history);
      console.log(this.state);
  };

  render() {
    let { extra_skills, status , error} = this.state;
    return this.props.auth.isAdmin ? (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="page-title mb-0">Dashboard</h4>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/skills"}>Skills</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Skills Create
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h2 className="text-uppercase text-center">Skills Create</h2>

                <Form onSubmit={this.submitHandler}>

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
            : <button type="button" className="btn btn-danger ml-2" onClick={() => this.removeExtraskills(index)} ><i className="fa fa-close" aria-hidden="true"></i></button>
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
                    <Form.Control
                      as="select"
                      name="status"
                      onChange={this.handleChange.bind(this)}
                      value={status}
                    >
                      <option value="publish">Publish</option>
                      <option value="revoke">Revoke</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="row">
                    <div className="col-sm-12 text-right">
                      <Link className="btn btn-primary mr-2" to="/skills">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create Skills
                      </button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-sm-12 text-center">
            <div className="card pt-5 pb-5">
              <div className="card-body">
                <h1>Opps.....! Sorry 😞</h1>
                <h3>It Only admin can Access </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skill,
  auth: state.auth
});

export default connect(mapStateToProps, { createSkills, addFlashMessage })(
  Skills
);
