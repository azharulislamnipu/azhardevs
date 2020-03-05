import React, { Component } from 'react';
import {connect} from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup  from 'react-bootstrap/InputGroup';
import { IoIosSearch, IoMdMenu , IoMdClose} from "react-icons/io";
import { Link, animateScroll as scroll } from "react-scroll";
import {  loadLogo } from '../store/actions/logoActions';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state ={
            scrolled:false,
            isNavbarCollapsed:false,
            hover: false,
            disabled:false,
            isSearch:false,
            searchField:false,
            isToggleOn:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.searchToogle = this.searchToogle.bind(this);
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

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
          }));
     }

    _getNavbarToggleIcon() {
        return this.state.isToggleOn ? (
         <span><IoMdClose/></span>
        ) : (
      <span><IoMdMenu/></span>
        );
    }
        hoverOn = (e) =>{
            this.setState({ hover: true, disabled:true });
        }
            
      hoverOff = () => { 
        this.setState({ hover: false });    
      }
      searchToogle = () =>{
        this.setState(state => ({
            isSearch: !state.isSearch
          }));

          if(this.state.isSearch== false){
             this.setState({
                searchField:true
             })
          }else{
            this.setState({
                searchField:false
             })
          }
      }

      searchIconChange = () =>{
        return this.state.isSearch ? (
           <IoMdClose/>
           ) : (
           <IoIosSearch/>
           );
      }


    render() {

        let { logos } = this.props.logos;
        const logoItem  = logos.length> 0 ? logos.map((logo,key)=>{
            if(logo.status === 'publish'){
              return (

                    <Navbar.Brand href="/" key={key}>
                        <img src={logo.logo_url} alt="logo"/>
                    </Navbar.Brand>

           
              )
            }
          }) : <span>No logo Available</span> ;


        return (
          <header className={this.state.scrolled ? 'header-area sticky-menu ': 'header-area '}>
          
            <Container>
                <Navbar expand="lg">
                  {logoItem}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  children={this._getNavbarToggleIcon()} onClick={this.handleClick}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                    
                        <Link
                        className='nav-link'
                         activeClass="active"
                        to="home"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >Home</Link>
               
                        <Link
                        className='nav-link'
                         activeClass="active"
                        to="about"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >About</Link>

                        <Link
                        className='nav-link'
                         activeClass="active"
                        to="service-area"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >Service</Link>

                        
                        <Link
                        className='nav-link'
                         activeClass="active"
                        to="portfolio"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >Portfolio</Link>

                        <Link
                        className='nav-link'
                         activeClass="active"
                        to="experience"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >Experience</Link>
                           
                        <Link
                        className='nav-link'
                         activeClass="active"
                        to="skills"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >Skills</Link>
                        </Nav>
                        <Form inline>
                       
                        <InputGroup className={this.state.searchField ? " w-100" : "serach-box"}>
                    
                      <Link
                        className='btn  btn-success request-btn rounded mr-30'
                        to="contact"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration= {500}
                        >Request demo</Link>
                        </InputGroup>
                       
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
    
            </header>
           
        );
    }
}
const mapStateToProps = state => ({
    logos: state.logo,
  })
export default connect(mapStateToProps, { loadLogo })(Header)