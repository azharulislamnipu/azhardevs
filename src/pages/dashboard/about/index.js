import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createAbout } from "../../../store/actions/aboutActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
class Abouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      sub_title: "",
      about_image: "",
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
    this.submitHandler = this.submitHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.about.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.about.error
      };
    }
    return null;
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
    formData.append("about_image", this.state.selectedFile[0]);
    this.props.createAbout(
      formData,
      this.props.addFlashMessage,
      this.props.history
    );
  };

  render() {
    let {
      title,
      sub_title,
      about_image,
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
                      <Link to={"/abouts"}>Abouts</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      about
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
                <h2 className="text-uppercase text-center">Create About</h2>

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
                    <Form.Label>Image Upload</Form.Label>

                    <Form.Control
                      type="file"
                      name="about_image"
                      multiple
                      onChange={this.filehander}
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
                  </Form.Group>

                  <Form.Group controlId="about_info">
                    <Form.Label>About Info</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows="4"
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
                      rows="4"
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

                  <Form.Group className="row">
                    <div className="col-sm-12 text-left">
                      <Link className="btn btn-primary mr-2" to="/abouts">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create About
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
  about: state.about,
  auth: state.auth
});

export default connect(mapStateToProps, { createAbout, addFlashMessage })(
  Abouts
);
