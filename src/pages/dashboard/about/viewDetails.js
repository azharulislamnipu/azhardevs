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
      sub_title: "",
      about_image: "",
      about_image_url: "",
      about_info: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      age: "",
      nationality: "",
      status: "publish",
      error: {}
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.about.title,
      sub_title: this.props.about.sub_title,
      about_image: this.props.about.about_image,
      about_image_url: this.props.about.about_image_url,
      about_info: this.props.about.about_info,

      name: this.props.bio.name,
      email: this.props.bio.email,
      phone: this.props.bio.phone,
      address: this.props.bio.address,
      age: this.props.bio.age,
      nationality: this.props.bio.nationality,
      status: this.props.about.status
    });
  }

  render() {
    let {
      title,
      sub_title,
      about_image,
      about_image_url,
      about_info,
      name,
      email,
      phone,
      address,
      age,
      nationality,
      status
    } = this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark"> About Details {status =='publish' ? <span className="badge badge-success">{status}</span> : <span className="badge badge-danger">{status}</span> } </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Media>
          <img
            width={150}
            height={150}
            className="mr-3"
            src={about_image_url}
            alt={about_image}
          />
          <Media.Body>
            <h5>{title}</h5>
            <em>{sub_title}</em>
            <p>
             {about_info}
            </p>
          </Media.Body>
          </Media>
          <Media>
          <Media.Body>
          <h2>Bio</h2>
          <div className='bg-dark p-3 bio-text'>

            
          <Row>
                            <Col lg={6} md={6} sm={12}>
                                <p>Name: <span> {name}</span></p>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                <p>Email: <a href={`mailto:${email}`}>{email}</a> </p>
                                </Col>
                          
                                <Col lg={6} md={6} sm={12}>
                                <p>Age: <span>{age}</span></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Address: <span>{address}</span></p>
                                </Col>
                          
                                <Col lg={6} md={6} sm={12}>
                                <p>Nationality: <span>{nationality}</span></p>
                                </Col>
                                 
                      </Row> 


            </div>
          </Media.Body>
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
