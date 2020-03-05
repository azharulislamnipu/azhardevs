import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addFlashMessage } from "../../../store/actions/flashMessages";
import { updateAbout } from '../../../store/actions/aboutActions';
class UpdateAbout extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: "",
          sub_title: "",
          about_image: "",
          about_image_url: "",
          about_current_url: "",
          about_info: "",
    
          selectedFile: "",
          filename: "",
    
          name: "",
          email: "",
          phone: "",
          address: "",
          age: "",
          nationality: "",
          status: "publish",
          error: {}
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filehander = this.filehander.bind(this);
      }
 

  componentDidMount() {
    this.setState({
      title: this.props.abouts.error.title?  this.state.title : this.props.about.title,
      sub_title: this.props.abouts.error.sub_title?  this.state.sub_title : this.props.about.sub_title,
      about_image:  this.props.abouts.error.about_image?  this.state.about_image : this.props.about.about_image, 
      about_image_url:  this.props.about.about_image_url, 
      about_current_url:  this.props.about.about_image_url, 
      about_info: this.props.about.about_info,

      name: this.props.abouts.error.name?  this.state.name : this.props.bio.name,
      email:  this.props.abouts.error.email?  this.state.email : this.props.bio.email,
      phone:  this.props.abouts.error.phone?  this.state.phone : this.props.bio.phone,
      address:  this.props.abouts.error.address?  this.state.address :this.props.bio.address,
      age:  this.props.abouts.error.age?  this.state.age : this.props.bio.age,
      nationality:  this.props.abouts.error.nationality?  this.state.nationality : this.props.bio.nationality,
      status: this.props.about.status
    });
  }



  handleChange(e) {
    this.setState({
      status: e.target.value
    });
  }
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  filehander = e => {
    this.setState({ selectedFile: e.target.files });
    this.setState({ filename: e.target.files[0].name });
  };



  submitHandler = event => {
    event.preventDefault();
    let {
      title,
      sub_title,
      about_image,
      about_image_url,
      about_info,
      name,
      email,
      phone,
      address,
      age,
      nationality,
      status,
      error
    } = this.state;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("sub_title", sub_title);
    formData.append("about_info", about_info);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("age", age);
    formData.append("nationality", nationality);
    formData.append("status", status);
    formData.append("about_image_name", this.state.filename);
    formData.append("about_current_url", about_image_url);
    
    if(this.state.filename == ''){
      formData.append("about_image", this.state.about_image);
    }else{
      formData.append("about_image", this.state.selectedFile[0]);
    }

    this.props.updateAbout(this.props.about._id, formData, this.props.addFlashMessage, this.props);


  };



  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.abouts.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.abouts.error
      };
    }
    return null;
  }

  render() {
   
    let {
        title,
        sub_title,
        about_image,
        about_image_url,
        about_info,
        name,
        email,
        phone,
        address,
        age,
        nationality,
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
            <h3 className="text-dark"> Update About</h3>
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

            
            <Form.Group controlId="subtitle">
                    <Form.Label>Sub Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="sub_title"
                      autoComplete="new-sub_title"
                      placeholder="Enter Your Sub Title"
                      value={sub_title}
                      onChange={this.changeHandler}
                    />
                    {error.sub_title && (
                      <span
                        className={
                          error.sub_title
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.sub_title}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="image">

                      <div className="d-inline-block">
                      <img src={about_image_url} className="thumb-lg rounded-circle mr-2" alt="about-image"/>
                      </div>
                      <div className="d-inline-block">
                      <Form.Label>Image Upload</Form.Label>
                
                <Form.Control
                  type="file"
                  name="about_image"
                  multiple
                  onChange={this.filehander}
                />
                
                  <Form.Control 
                  type="hidden"
                  name="about_current_url"
                  value={about_image_url}
                />
                {error.about_image && (
                  <span
                    className={
                      error.about_image
                        ? "invalid-feedback d-block"
                        : "invalid-feedback"
                    }
                  >
                    {error.about_image}
                  </span>
                )}

                      </div>
                    
                  </Form.Group>

                  <Form.Group controlId="about_info">
                    <Form.Label>About Info</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="about_info"
                      autoComplete="new-about_info"
                      placeholder="Enter Your About Details"
                      value={about_info}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>

                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      autoComplete="new-name"
                      placeholder="Enter Your name"
                      value={name}
                      onChange={this.changeHandler}
                    />
                    {error.name && (
                      <span
                        className={
                          error.name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.name}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      autoComplete="new-email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={this.changeHandler}
                    />
                    {error.email && (
                      <span
                        className={
                          error.email
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.email}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="Phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      autoComplete="new-phone"
                      placeholder="Enter Your phone number"
                      value={phone}
                      onChange={this.changeHandler}
                    />
                    {error.phone && (
                      <span
                        className={
                          error.phone
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.phone}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="address"
                      autoComplete="new-address"
                      placeholder="Enter Your address"
                      value={address}
                      onChange={this.changeHandler}
                    />
                    {error.address && (
                      <span
                        className={
                          error.address
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.address}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      autoComplete="new-age"
                      placeholder="Enter Your age"
                      value={age}
                      onChange={this.changeHandler}
                    />
                    {error.age && (
                      <span
                        className={
                          error.age
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.age}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="nationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                      type="text"
                      name="nationality"
                      autoComplete="new-nationality"
                      placeholder="Enter Your nationality"
                      value={nationality}
                      onChange={this.changeHandler}
                    />
                    {error.nationality && (
                      <span
                        className={
                          error.nationality
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.nationality}
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
  abouts: state.about
});

export default connect(mapStateToProps, { updateAbout , addFlashMessage })(UpdateAbout);