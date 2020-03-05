import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addFlashMessage } from "../../../store/actions/flashMessages";
import { updateLogo } from '../../../store/actions/logoActions';
class UpdateLogo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          logo_name: "",
          logo: "",
          current_logo_name: "",
          current_logo_url: "",
          status: "",
          error: {}
        };
        this.handleChange = this.handleChange.bind(this);
      }
 

  componentDidMount() {
    this.setState({
      current_logo_name: this.props.logo.logo_name,
      current_logo_url: this.props.logo.logo_url,
      status: this.props.logo.status
    });
  }



  handleChange(e) {
    this.setState({
      status: e.target.value
    });
  }

  filehander = e => {
    this.setState({ logo: e.target.files });
    this.setState({ logo_name: e.target.files[0].name });
  };

  submitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("logo_name", this.state.logo_name);
    formData.append("current_logo_name", this.state.current_logo_name);
    formData.append("current_logo_url", this.state.current_logo_url);
    formData.append("logo", this.state.logo[0]);
    formData.append("status", this.state.status);

    this.props.updateLogo(this.props.logo._id, formData, this.props.addFlashMessage, this.props);
    
  }



  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.logos.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.logos.error
      };
    }
    return null;
  }

  render() {
   
      let {
        logo, current_logo_name,  status, 
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
            <h3 className="text-dark"> Update Logo</h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}  method="post"
                  encType="multipart/form-data">
          <Modal.Body>
        
          <Form.Group>
                    <Form.Label>Logo Image Upload</Form.Label>

                    <Form.Control
                      type="file"
                      name="logo"
                      onChange={this.filehander}
                    />
                    <Form.Control
                      type="hidden"
                      id='current_logo_name'
                      name="current_logo_name"
                      value={current_logo_name}
                    
                    />
                    {error.logo_name && (
                      <span
                        className={
                          error.logo_name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.logo_name}
                      </span>
                    )}
                  </Form.Group>
                  
                  <Form.Group>
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
    logos: state.logo
});

export default connect(mapStateToProps, { updateLogo , addFlashMessage })(UpdateLogo);