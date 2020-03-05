import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { createEducation } from "../../../store/actions/educationActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
class Education extends Component {
  constructor(props) {
    super();
    this.state = {
      organization_name:"",
      program_title:"",
      description:"",
      start_date:new Date(),
      end_date: new Date(),
      status: "publish",
      error: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
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

  handleChange = e => {
    this.setState({
      status: e.target.value
    });
  };
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

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandler = event => {
    event.preventDefault();

    let {
      organization_name,
      program_title,
      description,
      start_date,
      end_date,
      status
    } = this.state;


    this.props.createEducation(
      {  
        organization_name,
        program_title,
        description,
        start_date,
        end_date,
        status },
      this.props.addFlashMessage,
      this.props.history
    );
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
    return this.props.auth.isAdmin ?  (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="page-title mb-0">Dashboard</h4>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/educations"}>Educations</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Education Create
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
                <h2 className="text-uppercase text-center">
                  Education Create
                </h2>

                <Form onSubmit={this.submitHandler}>
                  
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

                  <Form.Group className="row">
                    <div className="col-sm-12 text-right">
                      <Link className="btn btn-primary mr-2" to="/educations">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create Education
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
  educations: state.education,
  auth: state.auth
});

export default connect(mapStateToProps, { createEducation, addFlashMessage })(
  Education
);
