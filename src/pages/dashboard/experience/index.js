import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { creatExperience } from "../../../store/actions/experienceActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";


class Experience extends Component {
  constructor(props) {
    super();
    this.state = {
      company_name: "",
      icon: "",
      designation: "",
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
      JSON.stringify(nextProps.experiences.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.experiences.error
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
      company_name,
      icon,
      designation,
      start_date,
      end_date,
      status
    } = this.state;

  
    this.props.creatExperience(
      { company_name,
        icon,
        designation,
        start_date,
        end_date,
        status },
      this.props.addFlashMessage,
      this.props.history
    );
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
                      <Link to={"/experiences"}>Experiences</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Experiences Create
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
                  Experiences Create
                </h2>

                <Form onSubmit={this.submitHandler}>
                  
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
                      <Link className="btn btn-primary mr-2" to="/experiences">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create Experience
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
  auth: state.auth,
  experiences: state.experience
});

export default connect(mapStateToProps, { creatExperience, addFlashMessage })(
  Experience
);
