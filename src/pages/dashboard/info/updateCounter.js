import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateinfo } from "../../../store/actions/infoActions";
import { addflashmessage } from "../../../store/actions/flashMessages";
class UpdateInfo extends Component {


    constructor(props) {
        super(props);
        this.state = {
          title: "",
          info_icon: "",
          info_name: [''],
          status: "",
          error: {}
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.infos.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.infos.error
      };
    }
    return null;
  }

  componentDidMount() {
    this.setState({
      title: this.props.infos.error.title?  this.state.title : this.props.info.title,
      info_icon: this.props.infos.error.info_icon?  this.state.info_icon : this.props.info.info_icon,
      info_name:  this.props.info.info_name,
      status: this.props.info.status
    });
  }

  addInfoName(e){

    this.setState({info_name:[...this.state.info_name, ""]})
}
remove = (sidx) => {
  if (sidx > 0) {
    this.setState({
      info_name: this.state.info_name.filter((s, idx) => idx !== sidx)
    });
  }

};

chanevalue = (event, index) => {
  this.state.info_name[index] = event.target.value;
  this.setState({info_name: this.state.info_name});
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
    this.props.updateinfo(this.props.info._id, this.state, this.props.addflashmessage, this.props);

  };


  render() {
   

    let { title, info_icon, info_name, status, error } = this.state;
 
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
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
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

          
            <Form.Group controlId="info_icon">
              <Form.Label>Info Icon</Form.Label>
              <Form.Control
                type="text"
                name="info_icon"
                placeholder="Enter Your Counter Icon"
                value={info_icon}
                onChange={this.changeHandler}
              />
              {error.info_icon && (
                      <span
                        className={
                          error.info_icon
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.info_icon}
                      </span>
                    )}
            </Form.Group>

            
            <Form.Group controlId="info_name">
                    <Form.Label>InfoName</Form.Label>
                    {this.state.info_name.map((value, index) => {
                      return (

                        <div key={index}>

                          <Form.Control type="text"  className='w-90 d-inline-block' placeholder='Enter Your Info Name' value={value} onChange={(e) => this.chanevalue(e, index)} />
                          <button type='button' className='btn btn-danger float-right ml-2' onClick={() => this.remove(index)}>X</button>
                        </div>
                      )
                    })}
                    <button className="btn btn-primary float-right mt-2" onClick={(e) => { e.preventDefault(); this.addInfoName(e) }}>Add new Info</button>
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
  infos: state.info
});

export default connect(mapStateToProps, { updateinfo , addflashmessage })(UpdateInfo);