import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addFlashMessage } from "../../../store/actions/flashMessages";
import { updateCV } from '../../../store/actions/cvActions';
class UpdateCV extends Component {

    constructor(props) {
        super(props);
        this.state = {
          cv_name: "",
          cv: "",
          current_cv_name: "",
          current_cv_url: "",
          status: "",
          error: {}
        };
        this.handleChange = this.handleChange.bind(this);
      }
 

  componentDidMount() {
    this.setState({
      current_cv_name: this.props.cv.cv_name,
      current_cv_url: this.props.cv.cv_url,
      status: this.props.cv.status
    });
  }



  handleChange(e) {
    this.setState({
      status: e.target.value
    });
  }

  cvhandler = e => {
    this.setState({ cv: e.target.files });
    this.setState({ cv_name: e.target.files[0].name });
  };

  submitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("cv_name", this.state.cv_name);
    formData.append("current_cv_name", this.state.current_cv_name);
    formData.append("current_cv_url", this.state.current_cv_url);
    formData.append("cv", this.state.cv[0]);
    formData.append("status", this.state.status);

    this.props.updateCV(this.props.cv._id, formData, this.props.addFlashMessage, this.props);
    
  }



  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.cvs.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.cvs.error
      };
    }
    return null;
  }

  render() {
   
      let {
       cv, current_cv_name,  status, 
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
            <h3 className="text-dark"> Update CV</h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}  method="post"
                  encType="multipart/form-data">
          <Modal.Body>
        
          <Form.Group>
                    <Form.Label>CV Upload</Form.Label>

                    <Form.Control
                      type="file"
                      name="cv"
                      onChange={this.cvhandler}
                    />
                    <Form.Control
                      type="hidden"
                      id='current_cv_name'
                      name="current_cv_name"
                      value={current_cv_name}
                    
                    />
                    {error.cv_name && (
                      <span
                        className={
                          error.cv_name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.cv_name}
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
    cvs: state.cv
});

export default connect(mapStateToProps, { updateCV , addFlashMessage })(UpdateCV);