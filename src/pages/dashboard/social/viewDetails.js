import Modal from "react-bootstrap/Modal";
import Media from 'react-bootstrap/Media'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from "react";
class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type:"",
      social_icon:"",
      social_tag:"",
      social_link:"",
      status: "",
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.social.title,
      type: this.props.social.type,
      social_icon: this.props.social.social_icon,
      social_tag: this.props.social.social_tag,
      social_link: this.props.social.social_link,
      status: this.props.social.status,
    });
  }

  render() {
    let { title,
      type,
      social_icon,
      social_tag,
      social_link, status } =  this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="text-dark"> Social Info  {status =='publish' ? <span className="badge badge-success">{status}</span> : <span className="badge badge-danger">{status}</span> } </h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className='bg-primary'>

          <Media className='d-block'>
        
          <div className='bio-text p-3'>

            
          <Row>
                            <Col lg={6} md={6} sm={12}>
                                <p>Title: <span> {title}</span></p>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                <p>Social Type: {type}</p>
                                </Col>
                          
                                <Col lg={6} md={6} sm={12}>
                                <p>Social Icon: <span>{social_icon}</span></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Social Tag Line : <span>{social_tag}</span></p>
                                </Col>

                                <Col lg={12} md={12} sm={12}>
                                <p>Social Link: <a href={`${social_link}`}>{social_link}</a> </p>
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
