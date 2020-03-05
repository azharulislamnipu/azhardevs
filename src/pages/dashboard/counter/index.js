import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { creatCounter } from "../../../store/actions/counterActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";


class Counter extends Component {
  constructor(props) {
    super();
    this.state = {
      status: "publish",
      title: "",
      counter_number: "",
      counter_icon: "",
      duration: "",
      error: {}
    };
  }

  handleChange(e) {
    this.setState({
      status: e.target.value
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.counters.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.counters.error
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

    let { title, counter_number, counter_icon, duration, status } = this.state;

    this.props.creatCounter(
      { title, counter_number, counter_icon, duration, status },
      this.props.addFlashMessage,
      this.props.history
    );
  };

  render() {
    let { title, counter_number, counter_icon, duration, error } = this.state;
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
                      <Link to={"/dashboard"}>dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Counter
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
                <h2 className="text-uppercase text-center">Create Counter</h2>

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

                  <Form.Group controlId="counterNumber">
                    <Form.Label>Counter Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="counter_number"
                      autoComplete="new-counter_number"
                      placeholder="Enter Your Coutner Number"
                      value={counter_number}
                      onChange={this.changeHandler}
                    />

                    {error.counter_number && (
                      <span
                        className={
                          error.counter_number
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.counter_number}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="counterIcon">
                    <Form.Label>Counter Icon</Form.Label>
                    <Form.Control
                      type="text"
                      name="counter_icon"
                      autoComplete="new-counter_icon"
                      placeholder="Enter Your Counter Icon"
                      value={counter_icon}
                      onChange={this.changeHandler}
                    />
                    {error.counter_icon && (
                      <span
                        className={
                          error.counter_icon
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.counter_icon}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="duration">
                    <Form.Label>Counter Duration</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration"
                      autoComplete="new-duration"
                      placeholder="Enter duration"
                      value={duration}
                      onChange={this.changeHandler}
                    />
                    {error.duration && (
                      <span
                        className={
                          error.duration
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.duration}
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
                      <Link className="btn btn-primary mr-2" to="/counters">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Add Counter
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
  counters: state.counter,
  auth: state.auth,
});

export default connect(mapStateToProps, { creatCounter, addFlashMessage })(
  Counter
);
