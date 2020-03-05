import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Title = (props) => {
    const template =
        <Row>
            <Col lg={12} md={12} sm={12} className={'d-flex '+props.position}>
                <div className={'section-title pb-50 '+props.align}>
                    <h6 style={{color:props.style.titlecolor}}>{props.title}</h6>
                    <h2 style={{color:props.style.headingcolor}}><span>{props.headline}</span></h2>
                </div>
          </Col>
        </Row>;

        return template;

}
export default Title;