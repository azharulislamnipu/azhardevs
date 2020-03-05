import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const Profile = (props) => {
    let {
        name,
        email,
        phone,
        address,
        age,
        nationality
      } = props.bio;
  return (

                 <div className="profile">
                    <Row>
                    <Col lg={6} md={6} sm={12}>
                                <p>Name: <span> {name}</span></p>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                <p>Email: <a className='text-white' href={`mailto:${email}`}>{email}</a> </p>
                                </Col>
                          
                                <Col lg={6} md={6} sm={12}>
                                <p>Age: <span>{age}</span></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Phone: <a className='text-white' href={`tel:${phone}`}>{phone}</a></p>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                <p>Address: <span>{address}</span></p>
                                </Col>
                          
                                <Col lg={6} md={6} sm={12}>
                                <p>Nationality: <span>{nationality}</span></p>
                                </Col>
                                 
                      </Row> 
                    
                    </div>
 
  )
}
export default Profile;