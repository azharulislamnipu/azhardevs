import React, { Component } from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Scroll from 'react-scroll';
import { Link, animateScroll as scroll } from "react-scroll";
import { IoMdArrowUp } from "react-icons/io";
import {  loadLogo } from '../store/actions/logoActions';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state ={
            scrolled:false
        };
    
      }
    componentDidMount(){
        this.props.loadLogo();
        window.addEventListener('scroll',() => {
            const isScroll = window.scrollY < 100;
            if(isScroll !== true){
                this.setState({ scrolled:true});
            }else{
                this.setState({ scrolled:false});
            }

        });
    }
    componentWillUnmount(){
        window.removeEventListener('scroll');
    }

    render() {
        let { logos } = this.props.logos;
        const logoItem  = logos.length> 0 ? logos.map((logo,key)=>{
            if(logo.status === 'publish'){
              return (


                  <Col lg={4} md={4} sm={6} className='text-left footer-wedget' key={key}>
            
                      <a className="logo" href="/"> <img src={logo.logo_url} alt="logo"/></a>
                  </Col>

              )
            }
          }) : <span>No logo Available</span> ;
        return (
           <footer className="footer-area">
    
              <Container>
              <Row className='align-items-center pb-10 pt-40'>

                    {logoItem}
                  <Col lg={4} md={4} sm={6} className='text-center footer-wedget'>
                  <h2 className="text-center">Let’s Talk?</h2>
                  </Col>

                  <Col lg={4} md={4} sm={6} className='text-right footer-wedget'>
            
                  <Link
                        className='btn btn-success'
                        to="contact"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >Let’s Chat</Link>
                  </Col>
              </Row>
              <Row className='align-items-center pb-30 pt-30'>
                  <Col lg={12} md={12} sm={12} className='text-center'>
                   <p>   Copyright By@azhardevs - {new Date().getFullYear()} </p>
                  </Col>
                
                </Row>
              </Container>

              <Link
                        className= {this.state.scrolled ? 'float-right rounded btn btn-success scroll-top d-block': 'float-right rounded btn btn-success scroll-top d-none'}
                        to="home"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        ><IoMdArrowUp/></Link>

           </footer>  
        )
    }
}

const mapStateToProps = state => ({
    logos: state.logo,
  })
export default connect(mapStateToProps, { loadLogo })(Footer);