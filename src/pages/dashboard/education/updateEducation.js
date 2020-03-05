import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateEducation } from "../../../store/actions/educationActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
class UpdateEducation extends Component {


    constructor(props) {
        super(props);
        this.state = {
          organization_name:"",
          program_title:"",
          description:"",
          start_date:new Date(),
          end_date: new Date(),
          status: "",
          error: {}
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.educations.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.educations.error
      };
    }
    return null;
  }

  componentDidMount() {

    let startdate = new Date(this.props.education.start_date);
    let enddate = new Date(this.props.education.end_date);
    
     
    this.setState({
      organization_name: this.props.educations.error.organization_name?  this.state.organization_name : this.props.education.organization_name,
      program_title: this.props.educations.error.program_title?  this.state.program_title : this.props.education.program_title,
      description: this.props.educations.error.description?  this.state.description : this.props.education.description,
      start_date: startdate,
      end_date: enddate,
      status: this.props.education.status
    });
  }

  handleStartDate = date => {
    this.setState({
      start_date: date
    });
  };
  handleEndDate = date => {
    this.setState({
      end_date: date
    });
  };


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
    this.props.updateEducation(this.props.education._id, this.state, this.props.addFlashMessage, this.props);

  };


  render() {
   
    let {
      organization_name,
      program_title,
      description,
      start_date,
      end_date,
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
            <h3 className="text-dark"> Update Info</h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}>
          <Modal.Body>
             
                       
          <Form.Group controlId="organization_name">
                    <Form.Label>Organization Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="organization_name"
                      autoComplete="new-organization_name"
                      placeholder="Enter Your Organization Name"
                      value={organization_name}
                      onChange={this.changeHandler}
                    />

                    {error.organization_name && (
                      <span
                        className={
                          error.organization_name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.organization_name}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="program_title">
                    <Form.Label>Program  Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="program_title"
                      autoComplete="new-program_title"
                      placeholder="Enter Your Program Title"
                      value={program_title}
                      onChange={this.changeHandler}
                    />

                    {error.program_title && (
                      <span
                        className={
                          error.program_title
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.program_title}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      autoComplete="new-description"
                      placeholder="Enter Your Description"
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
                  

                  <Row>
                  <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="start_date">
                <Form.Label>Start Date</Form.Label>
                  <DatePicker className="form-control ml-2" name='start_date'
                    selected={this.state.start_date}
                    onChange={this.handleStartDate} placeholder="dd/mm/yy" value={start_date}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                  />

                  {error.start_date && (<span className={error.start_date ? 'invalid-feedback d-block' : 'invalid-feedback'} >
                    {error.start_date}
                  </span>
                  )}
                </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group controlId="end_date">
                    <Form.Label>End Date</Form.Label>
                      <DatePicker className="form-control ml-2" name='end_date'
                        selected={this.state.end_date}
                        onChange={this.handleEndDate} placeholder="dd/mm/yy" value={end_date}
                        showYearDropdown
                        showMonthDropdown
                        scrollableYearDropdown
                      />

                      {error.end_date && (<span className={error.end_date ? 'invalid-feedback d-block' : 'invalid-feedback'} >
                        {error.end_date}
                      </span>
                      )}
                    </Form.Group>
                  </Col>
                  </Row>

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
  educations: state.education
});

export default connect(mapStateToProps, { updateEducation, addFlashMessage })(UpdateEducation);