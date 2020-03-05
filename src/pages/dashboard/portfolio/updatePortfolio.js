import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addFlashMessage } from "../../../store/actions/flashMessages";
import { updatePortfolio } from "../../../store/actions/portfolioActions";

class UpdatePortfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: "",
          description: "",
          type:'',
    
          selectedFile: "",
          filename: "",
    
          feature_image:'',

          current_feature_image:'',

          gellaryFile:'',
        
          gellary: [""],
          gellary_image:'',
          current_gellary_image_url:[""],
          client_name: "",
          created_by: "",
          completed_date: '',
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
 
  componentDidMount() {
    const date = new Date(this.props.portfolio.completed_date);
    this.setState({
      title: this.props.portfolios.error.title?  this.state.title : this.props.portfolio.title,
      description: this.props.portfolios.error.description?  this.state.description : this.props.portfolio.description,
      type: this.props.portfolios.error.type?  this.state.type : this.props.portfolio.type,

      feature_image: this.props.portfolios.error.feature_image?  this.state.feature_image : this.props.portfolio.feature_image,
      current_feature_image: this.props.portfolio.feature_image,
      current_gellary_image_url: this.props.portfolio.image_url,
      current_gellary_image: this.props.portfolio.gellary_image,
      
      client_name: this.props.portfolios.error.client_name?  this.state.type : this.props.portfolio.client_name,
      created_by: this.props.portfolios.error.created_by?  this.state.created_by : this.props.portfolio.created_by,
      completed_date: date,
      skills: this.props.portfolios.error.skills?  this.state.skills : this.props.portfolio.skills,
      preview_url: this.props.portfolios.error.preview_url?  this.state.preview_url : this.props.portfolio.preview_url,
      status: this.props.portfolio.status
    });



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
      gellary_image,
      current_gellary_image_url,
      current_gellary_image,
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
    formData.append("current_feature_image", this.state.current_feature_image);
    formData.append("feature_image", this.state.selectedFile[0]);

      for (var i = 0; i <  this.state.gellaryFile.length; i++) {
        formData.append("gellary", this.state.gellaryFile[i]);
        formData.append("gellary_image",  this.state.gellaryFile[i].name);
    }
    

    for (var i = 0; i <  current_gellary_image_url.length; i++) {
      formData.append("current_gellary_image_url[]", current_gellary_image_url[i]);
    }
    for (var i = 0; i <  current_gellary_image.length; i++) {
      formData.append("current_gellary_image[]", current_gellary_image[i]);
    }


    formData.append("client_name", client_name);
    formData.append("created_by", created_by);
    formData.append("completed_date", completed_date);

    for (var i = 0; i <  this.state.skills.length; i++) {
      formData.append("skills", this.state.skills[i]);
    }

    formData.append("preview_url", preview_url);
    formData.append("status", status);

    this.props.updatePortfolio(this.props.portfolio._id, formData, this.props.addFlashMessage, this.props);

  };



  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.portfolios.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.portfolios.error
      };
    }
    return null;
  }

  render() {

      let {
        title,
        description,
        type,
        feature_image,
        current_feature_image,
        gellary_image,
        current_gellary_image,
        current_gellary_image_url,
        client_name,
        created_by,
        completed_date,
        skills,
        preview_url,
        status,
        error
      } = this.state;

    return (
      <Modal
      show={this.props.show} onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark"> Update Portfolio</h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}  method="post"
                  encType="multipart/form-data">
          <Modal.Body>


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

                   <Form.Control 
                      type="hidden"
                      name="current_feature_image"
                      onChange={this.filehander}
                      value={current_feature_image | ''}
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
                     <Form.Control  type="hidden"  name='current_gellary_image_url[]' className='d-inline-block' value={current_gellary_image_url|''}/>
                     <Form.Control type="hidden"  name='current_gellary_image' className='d-inline-block' value={current_gellary_image| ''}/>

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

                  <Form.Group >
                    <Form.Label>Skills</Form.Label>
                    {this.state.skills.map((value, index) => {
                      return (

                        <div key={index} >

                          <Form.Control id={'skills'+index} type="text" className='w-90 d-inline-block' placeholder='Enter Your skills' value={value} onChange={(e) => this.changeSkillsvalue(e, index)} />
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
  portfolios: state.portfolio
});

export default connect(mapStateToProps, { updatePortfolio, addFlashMessage })(UpdatePortfolio);