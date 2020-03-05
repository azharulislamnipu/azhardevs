import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSocial } from "../../../store/actions/socialActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
class UpdateSocial extends Component {


    constructor(props) {
        super(props);
        this.state = {
          title: "",
          type:"",
          social_icon:"",
          social_tag:"",
          social_link:"",
          status: "",
          error: {}
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.socials.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.socials.error
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
  
      title: this.props.socials.error.title?  this.state.title : this.props.social.title,
      type: this.props.socials.error.type?  this.state.type : this.props.social.type,
      social_icon: this.props.socials.error.social_icon?  this.state.social_icon : this.props.social.social_icon,
      social_tag: this.props.socials.error.social_tag?  this.state.social_tag : this.props.social.social_tag,
      social_link: this.props.socials.error.social_link?  this.state.social_link : this.props.social.social_link,
      status: this.props.social.status,
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
    this.props.updateSocial(this.props.social._id, this.state, this.props.addFlashMessage, this.props);

  };


  render() {
   
    let { title,
      type,
      social_icon,
      social_tag,
      social_link, status ,error} =  this.state;

    return (
      <Modal
      show={this.props.show} onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark"> Update Social Info</h3>
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

                  <Form.Group controlId="type">
                    <Form.Label>Social Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="type"
                      autoComplete="new-type"
                      placeholder="Enter Your Social Type"
                      value={type}
                      onChange={this.changeHandler}
                    />

                    {error.message && (
                      <span
                        className={
                          error.message
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.message}
                      </span>
                    )}

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

                  <Form.Group controlId="socialIcon">
                    <Form.Label>Social Icon</Form.Label>
                    <Form.Control
                      type="text"
                      name="social_icon"
                      autoComplete="new-social_icon"
                      placeholder="Enter Your Social Icon"
                      value={social_icon}
                      onChange={this.changeHandler}
                    />
                    {error.social_icon && (
                      <span
                        className={
                          error.social_icon
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.social_icon}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="socialTag">
                    <Form.Label>Social Tag Line</Form.Label>
                    <Form.Control
                      type="text"
                      name="social_tag"
                      autoComplete="new-social_tag"
                      placeholder="Enter Social Tag"
                      value={social_tag}
                      onChange={this.changeHandler}
                    />
                    {error.social_tag && (
                      <span
                        className={
                          error.social_tag
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.social_tag}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="Link">
                    <Form.Label>Social Link</Form.Label>
                    <Form.Control
                      type="text"
                      name="social_link"
                      autoComplete="new-social_link"
                      placeholder="Enter Social Link"
                      value={social_link}
                      onChange={this.changeHandler}
                    />
                    {error.social_link && (
                      <span
                        className={
                          error.social_link
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.social_link}
                      </span>
                    )}
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
  socials: state.social,
});

export default connect(mapStateToProps, { updateSocial, addFlashMessage })(UpdateSocial);