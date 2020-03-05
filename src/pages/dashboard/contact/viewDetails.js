import Modal from "react-bootstrap/Modal";
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from "react";
class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email:"",
      organigation:"",
      subject:"",
      budget:"",
      description:"",
      replay_message:"",
      consult_date:"",
      phone:"",
      status: "",
    };
  }

  componentDidMount() {
    this.setState({
      fullname: this.props.contact.fullname,
      email: this.props.contact.email,
      organigation: this.props.contact.organigation,
      subject: this.props.contact.subject,
      consult_date: this.props.contact.consult_date,
      budget: this.props.contact.budget,
      description: this.props.contact.description,
      replay_message:this.props.contact.replay_message,
      phone: this.props.contact.phone,
      status: this.props.contact.status,
    });
  }

  render() {
  
      let { fullname, email, organigation, subject, consult_date, budget, description, replay_message, phone , status} = this.state;
     
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="text-dark"> Contact Details  {status =='unapprove' ? <span className="badge badge-danger">{status}</span> : <span className="badge badge-success">{status}</span> } </h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className='bg-primary'>

          <Media className='d-block'>
        
          <div className='bio-text p-3'>

            
          <Row>
                            <Col lg={6} md={6} sm={12}>
                                <p>Fullname: <span> {fullname}</span></p>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                <p>Contact Email: {email}</p>
                                </Col>
                          
                                <Col lg={6} md={6} sm={12}>
                                <p>Organigation: <span>{organigation}</span></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Subject: <span>{subject}</span></p>
                                </Col>

                                
                                <Col lg={6} md={6} sm={12}>
                                 <p>Consult Date: <span>{consult_date}</span></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Budget: <span>{budget}</span></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Phone: <span>{phone}</span></p>
                                </Col>

                                <Col lg={12} md={12} sm={12}>
                                <p>Description: <span>{description}</span></p>
                                </Col>

                                <Col lg={12} md={12} sm={12}>
                                <p>Replay message: <span>{replay_message}</span></p>
                                </Col>
                      </Row> 


            </div>
    
        </Media>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={this.props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}



export default ViewDetails;
