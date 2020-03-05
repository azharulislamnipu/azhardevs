import React from 'react'
import CountUp from 'react-countup';
import IconGenerate from '../../../ui' 
import Col from 'react-bootstrap/Col';
const CounterItem = ({number,type,icon,duration}) => {

  return (

              <Col lg={3} md={3} sm={6}  className="text-center">
                <div className="growth-counter">
                <div className="counter-icon"> <IconGenerate className={icon}/></div>
                <h3 className="growth-counter-number-wrapper">
                <CountUp end={parseInt(number)}  duration={duration} delay={1}/>
                </h3>
                <div className="growth-counter-title">  {type} </div>
              </div>
              </Col>
 
  )
}
export default CounterItem;