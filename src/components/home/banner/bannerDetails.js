import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BannerDetails = (props) => {

  let {  title, name, description, designation, cv, image, image_url, status, error  } = props.banner;
  const cvItem =
  props.cvs.length > 0 ? (
    props.cvs.map((cv, key) => {
      if (cv.status === "publish") {
        return    <div className="banner-btn" key={key}>
        <a href={cv.cv_url} className='btn btn-success rounded' target='_blank'> Doawnload CV</a>
      
        </div>;
      }
    })
  ) : (
    <span>No Banner Data Available</span>
  );


  const designationdata =
  designation.length > 0 ? (
    designation.map((degintion, key) => {
          
            return  <li key={key}>{degintion}</li>;

        })
      ) : (
        <span>No designation Available</span>
      );


  return (
                   
              <Row>
              <Col lg={7} md={7} sm={12}>
                <div className="info-header table-cell">
                  <h1>
                    <span>{title}</span> <br /> <span>I'm</span> {name}
                    <br /> <span>{description}</span>
                  </h1>

                  <ul className="banner-meta">
                  {designationdata}
    
                  </ul>
                  {cvItem}

               
                </div>
              </Col>
              <Col lg={5} md={5} sm={12}>
                 <img src={`${image_url}`} alt={image} /> 
              </Col>
            </Row>
             
  )
}
export default BannerDetails;