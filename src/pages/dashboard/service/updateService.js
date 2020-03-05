import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateService } from "../../../store/actions//serviceActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
class UpdateService extends Component {


    constructor(props) {
        super(props);
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

  componentDidMount() {
    this.setState({
  
      title: this.props.services.error.title?  this.state.title : this.props.service.title,
      icon: this.props.services.error.icon?  this.state.icob : this.props.service.icon,
      description: this.props.services.error.description?  this.state.description : this.props.service.description,
      status: this.props.service.status
    });
  }
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
    this.props.updateService(this.props.service._id, this.state, this.props.addFlashMessage, this.props);

  };


  render() {
   
    let { title, icon, description, status, error } = this.state;

    return (
      <Modal
      show={this.props.show} onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark"> Update Service</h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}>
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

                 
                  <Form.Group controlId="icon">
                    <Form.Label>Service Icon</Form.Label>
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
  services: state.service
});

export default connect(mapStateToProps, { updateService, addFlashMessage })(UpdateService);