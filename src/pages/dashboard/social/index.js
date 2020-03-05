import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { creatSocial } from "../../../store/actions/socialActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";


class Social extends Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      type:"",
      social_icon:"",
      social_tag:"",
      social_link:"",
      status: "publish",
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
  handleChange(e) {
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
    let { title,
        type,
        social_icon,
        social_tag,
        social_link, status } =  this.state;


    this.props.creatSocial(
      { title,
        type,
        social_icon,
        social_tag,
        social_link,
         status },
      this.props.addFlashMessage,
      this.props.history
    );
  };

  render() {

    let { title,
        type,
        social_icon,
        social_tag,
        social_link, status ,error} =  this.state;
    return this.props.auth.isAdmin ? (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="page-title mb-0">Social</h4>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to={"/socials"}>Socials</Link>
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
                <h2 className="text-uppercase text-center">Create Social Information</h2>

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

                  <Form.Group className="row">
                    <div className="col-sm-12 text-right">
                      <Link className="btn btn-primary mr-2" to="/socials">
                        View List
                      </Link>
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create Social
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
  socials: state.social,
  auth: state.auth
});

export default connect(mapStateToProps, { creatSocial , addFlashMessage })(
    Social
);
