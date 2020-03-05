import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateExperience } from "../../../store/actions/experienceActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
class UpdateExperience extends Component {


    constructor(props) {
        super(props);
        this.state = {
          company_name: "",
          icon: "",
          designation: "",
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
      JSON.stringify(nextProps.experiences.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.experiences.error
      };
    }
    return null;
  }

  componentDidMount() {

    let startdate = new Date(this.props.experience.start_date);
    let enddate = new Date(this.props.experience.end_date);
    
     
    this.setState({
      company_name: this.props.experiences.error.company_name?  this.state.company_name : this.props.experience.company_name,
      icon: this.props.experiences.error.icon?  this.state.icon : this.props.experience.icon,
      designation: this.props.experiences.error.designation?  this.state.designation : this.props.experience.designation,
      start_date: startdate,
      end_date: enddate,
      status: this.props.experience.status
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
    this.props.updateExperience(this.props.experience._id, this.state, this.props.addFlashMessage, this.props);

  };


  render() {
   

    let {
      company_name,
      icon,
      designation,
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
             
          <Form.Group controlId="company_name">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="company_name"
                      autoComplete="new-company_name"
                      placeholder="Enter Your Compnay Name"
                      value={company_name}
                      onChange={this.changeHandler}
                    />

                    {error.company_name && (
                      <span
                        className={
                          error.company_name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.company_name}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="icon">
                    <Form.Label>Company Icon</Form.Label>
                    <Form.Control
                      type="text"
                      name="icon"
                      autoComplete="new-icon"
                      placeholder="Enter Your Compnay Icon"
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

                  <Form.Group controlId="designation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      name="designation"
                      autoComplete="new-designation"
                      placeholder="Enter Your Designation"
                      value={designation}
                      onChange={this.changeHandler}
                    />

                    {error.designation && (
                      <span
                        className={
                          error.designation
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.designation}
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
  experiences: state.experience
});

export default connect(mapStateToProps, { updateExperience, addFlashMessage })(UpdateExperience);