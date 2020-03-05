import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react';
import Slider from "react-slick";
import Title from '../../../../src/ui/title';
import { connect } from "react-redux";
import { loadPortfolios } from "../../../store/actions/portfolioActions";
import GridderGrid from './gridderGrid';
import GridderContent from './gridderContent';

function GridNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "none", background: "rgb(13, 231, 245)",bottom:'0',right:'auto',left:'45%',zIndex:'1',top:'auto' }}
      onClick={onClick}
    >
    <i className="fa fa-angle-down" style={{fontSize:'20px', color:'#ffffff'}}></i>
        </div>
  );
}

function GridPrevArrow(props) {
  const { className,  onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", background: "rgb(13, 231, 245)", top:'0',left:'45%',right:'auto',zIndex:'1',bottom:'auto' }}
      onClick={onClick}
    >
        <i className="fa fa-angle-up" style={{fontSize:'20px', color:'#ffffff'}}></i>
        </div>
  );
}

function GridContentNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", background: "rgb(13, 231, 245)",bottom:'auto',right:'0',left:'auto',zIndex:'1',top:'3%',borderRadius:0 }}
      onClick={onClick}
    >
    <i className="fa fa-angle-right" style={{fontSize:'20px', color:'#ffffff'}}></i>
        </div>
  );
}

function GridContentPrevArrow(props) {
  const { className,  onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", background: "rgb(13, 231, 245)", top:'3%',left:'auto',right:'4%',zIndex:'1',bottom:'auto',borderRadius:0 }}
      onClick={onClick}
    >
        <i className="fa fa-angle-left" style={{fontSize:'20px', color:'#ffffff'}}></i>
        </div>
  );
}


class Portfolios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.props.loadPortfolios();
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {

    

    const gridsettings = {
      speed: 400,
      autoplaySpeed: 3000,
      cssEase: "linear",
      draggable :false,
      nextArrow: <GridNextArrow />,
      prevArrow: <GridPrevArrow />
    };

    const gridcontentsettings = {
      speed: 400,
      autoplaySpeed: 3000,
      cssEase: "linear",
      draggable :false,
      nextArrow: <GridContentNextArrow/>,
      prevArrow: <GridContentPrevArrow/>
    };

    let { portfolios } = this.props.portfolios;

    const GridderGridItem = portfolios.length> 0 ? portfolios.map((portfolio,key)=>{
      let count = key + 1;
    
      if(portfolio.status === 'publish'){
        return (
          <GridderGrid portfolio={portfolio} count={count} key={key}/>
        )
      }
    }) : <span>No Gridder Grid Available</span> ;

    
    const GridderContentItem = portfolios.length> 0 ? portfolios.map((portfolio,key)=>{
      let count = key + 1;

      if(portfolio.status === 'publish'){
        return (
          <GridderContent portfolio={portfolio} count={count} key={key}/>
        )
      }
    }) : <span>No Gridder Content Available</span> ;


    return (
      <section className="portfolios-area">
               <Container className='mb-5'>
            {<Title title='Works' headline='My Portfolio' align='text-right' position='justify-content-end' style={{ headingcolor: '#1f2235', titlecolor: '#24204f' }} />}
            </Container>
        <div className="container-fluid p-0 grrider" id='portfolio'>
          <Row className="no-gutters align-items-center align-content-center">
            <Col lg={3} md={4} sm={12}>

              <Slider
                asNavFor={this.state.nav1}
                ref={slider => (this.slider2 = slider)}
                slidesToShow={2}
                swipeToSlide={true}
                focusOnSelect={true}
                vertical={true}
                verticalSwiping={true}
                {...gridsettings}
              >
              
              {GridderGridItem}


              </Slider>

            </Col>



            <Col lg={9} md={8} sm={12}>

              <Slider
                asNavFor={this.state.nav2}
                ref={slider => (this.slider1 = slider)}
                {...gridcontentsettings}
              >


              {GridderContentItem}


              </Slider>

            </Col>
          </Row>

        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  portfolios: state.portfolio
});

export default connect(mapStateToProps, { loadPortfolios })(Portfolios);
