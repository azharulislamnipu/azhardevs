import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import IconGenerate from '../../../ui';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const ServiceItem = props =>{
    let { title, icon, description } = props.service;
    description = description.substring(0,135) + ' ...';
    return (
          <Col lg={4} md={6} sm={12}>
                     <div className="service-box">
                        <div className="service-icon">
                           <IconGenerate className={icon} />
                        </div>
                        <div className="service-box-content">
                           <h4 className="service-title text-capitalize">{title}</h4>
                           <div className="service-content">
                              <p>{description}</p>

                           </div>
                        </div>
                     </div>
                  </Col>
                  
    )
}
export default ServiceItem;