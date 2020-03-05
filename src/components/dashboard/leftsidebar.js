import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
class LeftSideBar extends Component {
    render() {
        let {auth} = this.props;

        const Menu = auth.user.role ==='admin' ? 
                       <ul className="metismenu" id="side-menu">
                       <li className="menu-title text-center">Main</li>
                        <li>
                        <Link to='dashboard' className="waves-effect"> <i className="fa fa-pie-chart fa-2x" aria-hidden="true"></i>
                            <span> Dashboard </span> </Link>     
                        </li>
                           <li className="menu-title">
                               <Link to='/upload' className="waves-effect"><i className="fa fa-file fa-2x"></i> <span> Upload </span></Link>   
                            </li>
                           <li className="menu-title">
                               <Link to='/banner' className="waves-effect"><i className="fa fa-archive fa-2x"></i> <span> Banner </span></Link>   
                            </li>

                            <li className="menu-title">
                            <Link to='/counter' className="waves-effect"><i className="fa fa-glass fa-2x"></i> <span> Counter </span></Link> 
                        
                            </li>
                            
                            <li className="menu-title">
                             <Link to='/about' className="waves-effect"><i className="fa fa-shield fa-2x"></i> <span> About </span></Link>
                            </li>

                            <li className="menu-title">
                            <Link to='/social' className="waves-effect"><i className="fa fa-snapchat-ghost fa-2x"></i> <span> Social </span></Link> 
                            </li>

                            <li className="menu-title">
                            <Link to='/contact' className="waves-effect"><i className="fa fa-comments fa-2x"></i> <span> Contact </span></Link> 
                            </li>
                            <li className="menu-title">
                            <Link to='/info' className="waves-effect"><i className="fa fa-th-large fa-2x"></i> <span> Info </span></Link> 
                            </li>

                            <li className="menu-title">
                            <Link to='/portfolio' className="waves-effect"><i className="fa fa-file fa-2x"></i> <span> Portfolio </span></Link> 
                            </li>


                            <li className="menu-title">
                            <Link to='/service' className="waves-effect"><i className="fa fa-handshake-o fa-2x"></i> <span> Service </span></Link> 
                            </li>

                            <li className="menu-title">
                            <Link to='/skill' className="waves-effect"><i className="fa fa-thumb-tack fa-2x"></i> <span> Skills </span></Link> 
                            </li>

                            <li className="menu-title">
                            <Link to='/experience' className="waves-effect"><i className="fa fa-plug" aria-hidden="true"></i><span> Experience </span></Link> 
                            </li>
                            <li className="menu-title">
                            <Link to='/education' className="waves-effect"><i className="fa fa-graduation-cap" aria-hidden="true"></i><span> Education </span></Link> 
                            </li>
                        </ul>

        :
         <ul className="metismenu" id="side-menu">
        <li className="menu-title text-center">Main</li>
       

        <li class="menu-title">
           <Link to='/account' className="waves-effect"><i className="fa fa-user fa-2x"></i> <span> Profile </span></Link>   
        </li>
        </ul>;
      

        return (
                  
            <div className={this.props.sibarSate? "slide-menu left side-menu" : "left side-menu"}>
                <div className="slimscroll-menu" id="remove-scroll">

                  
                    <div id="sidebar-menu">
                    
                        {Menu}

                    </div>
                 
                    <div className="clearfix"></div>

                </div>
             

            </div>
         
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
 });
export default connect(mapStateToProps)(LeftSideBar);