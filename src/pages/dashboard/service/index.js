import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { creatService } from "../../../store/actions/serviceActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";


class Service extends Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      icon: "",
      description: "",
      status: "publish",
      error: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.services.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.services.error
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

    let { title, icon, description, status } = this.state;

    this.props.creatService(
      {title, icon, description, status },
      this.props.addFlashMessage,
      this.props.history
    );
  };

  render() {
    let { title, icon, description, status, error } = this.state;
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
                      <Link to={"/services"}>Services</Link>
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
                <h2 className="text-uppercase text-center">Create Service</h2>

                <Form onSubmit={this.submitHandler}>
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

                 
                  <Form.Group controlId="icon">
                    <Form.Label>Counter Icon</Form.Label>
                    <Form.Control
                      type="text"
                      name="icon"
                      autoComplete="new-icon"
                      placeholder="Enter Your Service Icon"
                      value={icon}
                      onChange={this.changeHandler}
                    />
                    {error.icon && (
                      <span
                        className={
                          error.icon
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.icon}
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


                  <Form.Group controlId="status.ControlSelect1">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      onChange={this.handleChange.bind(this)}
                      value={this.state.status}
                    >
                      <option value="publish">Publish</option>
                      <option value="revoke">Revoke</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="row">
                    <div className="col-sm-12 text-right">
                      <Link className="btn btn-primary mr-2" to="/services">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create Service
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
  services: state.service,
  auth: state.auth
});

export default connect(mapStateToProps, { creatService, addFlashMessage })(
  Service
);
