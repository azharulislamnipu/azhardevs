import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import React, { Component } from "react";
class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      status: "publish",
      preview_url:'',
      error: {}
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.portfolio.title,
      preview_url: this.props.portfolio.preview_url,
      status: this.props.portfolio.status
    });
  }

  render() {
    let { title,preview_url, status } = this.state;
  

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark">
              {title} : 
              {status == "publish" ? (
                <span className="badge badge-success ml-2">{status}</span>
              ) : (
                <span className="badge badge-danger ml-2">{status}</span>
              )}{" "}
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Carousel>
          {this.props.portfolio.image_url.length > 0 ? (
          this.props.portfolio.image_url.map((item, index) => {

            if(index != 0) return (

              <Carousel.Item key={index}>
                        <img src={item} />
              </Carousel.Item>
            );
      })
      ) : (
        <span>No gellaryItem</span>
      )}

          </Carousel>

        </Modal.Body>
        <Modal.Footer>
          <a href={preview_url}  className="btn btn-dark mr-2" target='_blank'> Prevew Prject </a>
          <button className="btn btn-danger" onClick={this.props.onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ViewDetails;
