import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createPortfolio } from "../../../store/actions/portfolioActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
import DatePicker from "react-datepicker";
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      type:'',

      selectedFile: "",
      filename: "",


      gellaryFile:'',
    
      gellary: [""],
      gellary_image:'',
      client_name: "",
      created_by: "",
      completed_date: new Date(),
      skills: [""],
      preview_url:'',
      status: "publish",
      error: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.filehander = this.filehander.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.portfolios.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.portfolios.error
      };
    }
    return null;
  }


  addSkills(e) {

    this.setState({ skills: [...this.state.skills, ""] })
  }

  changeSkillsvalue = (event, index) => {
    this.state.skills[index] = event.target.value;
    this.setState({ skills: this.state.skills });
  }
  removeSkills = (sidx) => {
    if (sidx > 0) {
      this.setState({
        skills: this.state.skills.filter((s, idx) => idx !== sidx)
      });
    }

  };
  handleDate = date => {
    this.setState({
      completed_date: date
    });
  };
  handleChange(e) {
    this.setState({
      status: e.target.value
    });
  }

  handleTypeChange(e) {
    this.setState({
      type: e.target.value
    });
  }
  filehander = e => {
    this.setState({selectedFile: e.target.files});
    this.setState({filename: e.target.files[0].name});
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


 gellaryhander = e => {
    this.setState({ gellaryFile: e.target.files });
  };

 

  submitHandler = event => {
    event.preventDefault();
    let {
      title,
      description,
      type,
      feature_image,
      gellary,
      client_name,
      created_by,
      completed_date,
      skills,
      preview_url,
      status,
      error
    } = this.state;

   

    completed_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(completed_date);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);



    formData.append("feature_image_name", this.state.filename);
    formData.append("feature_image", this.state.selectedFile[0]);


    for (var i = 0; i <  this.state.gellaryFile.length; i++) {
      formData.append("gellary", this.state.gellaryFile[i]);
      formData.append("gellary_image[]",  this.state.gellaryFile[i].name);
  }


    formData.append("client_name", client_name);
    formData.append("created_by", created_by);
    formData.append("completed_date", completed_date);

    for (var i = 0; i <  this.state.skills.length; i++) {
      formData.append("skills", this.state.skills[i]);
    }

    formData.append("preview_url", preview_url);
    formData.append("status", status);



    this.props.createPortfolio(
      formData,
      this.props.addFlashMessage,
      this.props.history
    );
  };

  render() {
    let {
      title,
      description,
      type,
      feature_image,
      gellary_image,
      client_name,
      created_by,
      completed_date,
      skills,
      preview_url,
      status,
      error
    } = this.state;

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
                      <Link to={"/portfolios"}>Portfolios</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                       Create
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
                <h2 className="text-uppercase text-center">Create Portfolio</h2>

                <Form
                  onSubmit={this.submitHandler}
                  method="post"
                  encType="multipart/form-data"
                >
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      autoComplete="new-title"
                      placeholder="Enter Your title"
                      value={title}
                      onChange={this.changeHandler}
                    />
                    {error.title && (
                      <span
                        className={
                          error.title
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.title}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="4"
                      name="description"
                      autoComplete="new-description"
                      placeholder="Enter Your description"
                      value={description}
                      onChange={this.changeHandler}
                    />

                    {error.description && (
                      <span
                        className={
                          error.description
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.description}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="type.controler">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      onChange={this.handleTypeChange}
                      value={type}
                    >
                      <option >Choose Your Project Type</option>
                      <option value="psd to html">PSD TO HTML</option>
                      <option value="psd to react">PSD TO REACT</option>
                      <option value="psd to fullstack">PSD TO FULLSTACK</option>
                      <option value="node js">NODE JS</option>
                      <option value="psd to angular">PSD TO ANGULAR</option>
                      <option value="psd to shopify">PSD TO SHOPIFY</option>
                      <option value="psd to wordpress">PSD TO WORDPRESS</option>
                    </Form.Control>

                    {error.type && (
                      <span
                        className={
                          error.type
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.type}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="feature_image">
                    <Form.Label>Feature Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="feature_image"
                      onChange={this.filehander}
                    />
                    {error.feature_image && (
                      <span
                        className={
                          error.feature_image
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.feature_image}
                      </span>
                    )}
                 
                  </Form.Group>



                  <Form.Group controlId="gellary_image">
                    <Form.Label>Gellary Image Upload</Form.Label>

                    <Form.Control
                      type="file"
                      name="gellary_image"
                      multiple
                      onChange={this.gellaryhander}
                    />
              

                    {error.gellary_image && (
                      <span
                        className={
                          error.gellary_image
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.gellary_image}
                      </span>
                    )}
                 
               
                  </Form.Group>

                  <Form.Group controlId="client_name">
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="client_name"
                      autoComplete="new-client_name"
                      placeholder="Enter Your Client Name"
                      value={client_name}
                      onChange={this.changeHandler}
                    />
                    {error.client_name && (
                      <span
                        className={
                          error.client_name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.client_name}
                      </span>
                    )}
                  </Form.Group>

                 

                  <Form.Group controlId="created_by">
                    <Form.Label>Created By</Form.Label>
                    <Form.Control
                      type="text"
                      name="created_by"
                      autoComplete="new-created_by"
                      placeholder="Enter Your Created By"
                      value={created_by}
                      onChange={this.changeHandler}
                    />
                    {error.created_by && (
                      <span
                        className={
                          error.created_by
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.created_by}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="completed_date">
                    <Form.Label>Completed Date : </Form.Label>
                    <DatePicker className="form-control ml-2" name='completed_date'
                    selected={this.state.completed_date}
                    onChange={this.handleDate} placeholder="dd/mm/yy" value={completed_date}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                  />
                  </Form.Group>

                
                  <Form.Group controlId="skills">
                    <Form.Label>Skills</Form.Label>
                    {this.state.skills.map((value, index) => {
                      return (

                        <div key={index}>

                          <Form.Control type="text" key={index} className='w-90 d-inline-block' placeholder='Enter Your skills' value={value} onChange={(e) => this.changeSkillsvalue(e, index)} />
                           {error.skills && (
                      <span
                        className={
                          error.skills
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.skills}
                      </span>
                    )}
                          <button type='button' className='btn btn-danger float-right ml-2' onClick={() => this.removeSkills(index)}>X</button>
                        
                        </div>
                      )
                    })}
                    <button className="btn btn-primary float-right mt-2" onClick={(e) => { e.preventDefault(); this.addSkills(e) }}>Add new Skill</button>
                  </Form.Group>

                  
                  <Form.Group controlId="preview_url">
                    <Form.Label>Project Preview Url</Form.Label>
                    <Form.Control
                      type="text"
                      name="preview_url"
                      autoComplete="new-preview_url"
                      placeholder="Enter Your Project Preview Url"
                      value={preview_url}
                      onChange={this.changeHandler}
                    />
                    {error.preview_url && (
                      <span
                        className={
                          error.preview_url
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.preview_url}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="status.controler">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      onChange={this.handleChange}
                      value={status}
                    >
                      <option value="publish">Publish</option>
                      <option value="revoke">Revoke</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="row">
                    <div className="col-sm-12 text-left">
                      <Link className="btn btn-primary mr-2" to="/portfolios">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create Portfolio
                      </button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    ): (
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
  auth: state.auth,
  portfolios: state.portfolio
});

export default connect(mapStateToProps, { createPortfolio, addFlashMessage })(
  Portfolio
);
