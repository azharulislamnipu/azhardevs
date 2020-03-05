import React, { Component } from 'react'
import logo from '../../img/logo.png';
import {Link} from 'react-router-dom';
import {logout} from '../../store/actions/authActions';
import {connect} from 'react-redux';
 class Topbar extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.sibarSate);
        this.toogledropdonw = this.toogledropdonw.bind(this);
        // this.sibarExpendHandler = this.sibarExpendHandler.bind(this);

        this.state = {
            aria_expanded: false,
            // sibarExpend:false
        };

    }

    // sibarExpendHandler() {

    //     this.setState({sibarExpend: !this.state.sibarExpend})
    // }

    toogledropdonw() {


        this.setState({aria_expanded: !this.state.aria_expanded})
    }

 
  render() {
    let {auth} = this.props;
    return (
        <div className="topbar">

               
        <div className= {this.props.sibarSate? "d-none" : "topbar-left"}>
           <Link to='/dashboard' className='logo'>  <img src={logo} alt="" height="50" className="logo-large"/></Link>
        </div>

        <nav className="navbar-custom" style={ this.props.sibarSate? {marginLeft: '0',   transition: '.5s ease-in'} : {marginLeft: '240px',  transition: '.5s ease-in-out'}} >
    
            <ul className="navbar-right d-flex list-inline float-right mb-0" >
                <li className={this.state.aria_expanded ? 'list-inline-item dropdown notification-list show' :'list-inline-item dropdown notification-list'}>
                    <a className="nav-link dropdown-toggle arrow-none waves-effect nav-user" onClick={this.toogledropdonw} data-toggle="dropdown" href="#" role="button"
                    aria-haspopup="false" aria-expanded={this.state.aria_expanded}>
                        <img src={logo} alt="user" className="rounded-circle"/>
                        <span className="d-none d-md-inline-block ml-1"> {auth.user.name} <i className="fa fa-angle-down ml-2"></i> </span>
                    </a>
                    <div className={this.state.aria_expanded ? "dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown show" : "dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown"}>
                        
                       <Link className="dropdown-item"  to='/account'> <i className="fa fa-user text-muted mr-2"></i> Profile</Link>
                    
                        <div className="dropdown-divider"></div>

                        <Link className="dropdown-item" to='#'  onClick={()=>{ this.props.logout(this.props.history)}}><i className="fa fa-external-link text-muted mr-2"></i> Logout</Link>
                    
            
                    </div>
                </li>

            </ul>

            <ul className="list-inline menu-left mb-0">
                <li className="float-left">
                    <button className="button-menu-mobile open-left waves-effect" onClick={this.props.sibarExpend}>
                        <i className="fa fa-bars"></i>
                    </button>
                </li>                        
            </ul>

        </nav>

    </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
 });
export default connect(mapStateToProps,{logout})(Topbar);