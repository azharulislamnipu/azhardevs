import React, { Component } from 'react';
import CounterItem from './CounterItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {connect} from 'react-redux';
import {  loadCounters } from '../../../store/actions/counterActions';
class Counters extends Component {

componentDidMount(){
  this.props.loadCounters()
}

  render() {
    let { counters } = this.props.counters;

    const counterItem = counters.length> 0 ? counters.map((counter,key)=>{
      if(counter.status === 'publish'){
        return (
         <CounterItem key={key} number={counter.counter_number} type={counter.title} icon={counter.counter_icon} duration={counter.duration}/>
        )
      }
    }) : <span>No Counter Data Available</span> ;

     return (
      <section className="counter-area">
        <Container>
          <Row className="align-items-center">
           {counterItem}
          </Row>
          </Container>
      </section>
    )
  }
}
const mapStateToProps = state => ({
  counters: state.counter,
})

export default connect(mapStateToProps, { loadCounters })(Counters)