import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import about from '../../../../src/img/about.jpg';
import Profile from './profile';
import Followme from './followme';
const AboutDetails = (props) => {
  let {
    title,
    sub_title,
    about_image_url,
    about_info,
  } = props.about;



  return (
                   <Row>
                       <Col lg={6} md={5} sm={12}>
                          <div className="about-img">
                            <div className="box-img">
                                {about_image_url?  <img src={about_image_url} alt="About-me"/> :  <img src={about} alt="About-me"/> }
                            </div>
                            </div>
                       </Col>
                       <Col  lg={6} md={7} sm={12}>

                       <div className="info-about">
                   
                    <div className="section-title-left">
                        <h2>{title}</h2>
                        <h3>{sub_title}</h3>
                    </div>
                    
                 
                    <p className="mb-30">{about_info}</p>

                    <Profile bio={props.about.bio}/>
                   
                    <Followme  followme={props.socials}/>

                    
            </div>
                       </Col>
                    </Row> 
                
             
  )
}
export default AboutDetails;