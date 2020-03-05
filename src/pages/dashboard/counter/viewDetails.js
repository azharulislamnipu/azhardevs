import Modal from "react-bootstrap/Modal";
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from "react";
class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
       status: "",
          title: "",
          counter_number: "",
          counter_icon: "",
          duration: "",
          error: {}
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.counter.title,
      counter_number: this.props.counter.counter_number,
      counter_icon: this.props.counter.counter_icon,
      duration: this.props.counter.duration,
      status: this.props.counter.status,
    });
  }

  render() {
  let { title, counter_number, counter_icon, duration, status } = this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark"> Counter Details {status =='publish' ? <span className="badge badge-success">{status}</span> : <span className="badge badge-danger">{status}</span> } </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className='bg-dark'>

          <Media className='d-block'>
        
          <div className='bio-text p-3'>

            
          <Row>
                            <Col lg={6} md={6} sm={12}>
                                <p>Title: <span> {title}</span></p>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                <p>Counter Number: {counter_number}</p>
                                </Col>
                          
                                <Col lg={6} md={6} sm={12}>
                                <p>Counter Icon: <span>{counter_icon}</span></p>
                                </Col>

                           

                                <Col lg={6} md={6} sm={12}>
                                <p>Duration: <span>{duration}</span></p>
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
