import React, { Component } from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import {  loadAbouts } from '../../../store/actions/aboutActions';
import {  loadSocials } from '../../../store/actions/socialActions';
import AboutDetails from './aboutDetails';
class About extends Component {

    componentDidMount(){
        this.props.loadAbouts();
        this.props.loadSocials();
    }

    render() {
        let { abouts } = this.props.abouts;
        const showAboutDetails  = abouts.length> 0 ? abouts.map((about,key)=>{
            if(about.status === 'publish'){
              return (
                <AboutDetails about={about} socials={this.props.socials} key={key}/> 
              )
            }
          }) : <span>No About Details Data Available</span> ;

        return (
            <section id='about' className='about-area ptb-100'>
                <Container>
                 {showAboutDetails}
              </Container>
            </section>
            
        )
    }
}

const mapStateToProps = state => ({
    abouts: state.about,
    socials: state.social,
  })
  
  export default connect(mapStateToProps, { loadAbouts, loadSocials })(About)