import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const GridderGrid = (props) => {
    let {
        title,
        type,
        image_url,
        feature_image,
      } =  props.portfolio;
  return (
             
                  <Row>
                    <Col lg={12} md={12} sm={12} >
                      <div id={`gridder-${props.count}`} className="gridder-grid fix hover-style2" data-griddercontent={`#project-${props.count}`}>

                        <div className="gridder-list percent-25">
                          <div className="single-portfolio overlay dark-1">
                            <img src={image_url[0]} alt={feature_image} />
                            <div className="project-title">
                              <h3 className="white-color">{title}</h3>
                              <h6 className="white-color">{type}</h6>
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </Col>
                  </Row>
  )
}
export default GridderGrid;