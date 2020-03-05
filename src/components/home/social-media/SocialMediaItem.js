import React from 'react'
import CountUp from 'react-countup';
import IconGenerate from '../../../ui' 
import Col from 'react-bootstrap/Col';
const SocialMediaItem = (props) => {
    let { title,
        social_icon,
        social_tag,
        social_link } =  props.social;
  return (

             <Col lg={4} md={6} sm={12}>
                  <div className="social-media-nfo">
				    <div className="social-media-container">
			         <a className="arrow-button" href={social_link} target='_blank'>
                         <span className="button-icon"><i className={social_icon}></i></span>
                         <span className="button-text">
                             <span className="top_label">{title}</span>
                             <span className="button-title">{social_tag}</span>
                             </span>
                             </a>	
                   </div>
				</div>
                  </Col>
 
  )
}
export default SocialMediaItem;