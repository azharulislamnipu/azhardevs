import React, { Component, Fragment } from 'react';
import './css/styles.scss';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Banner from './pages/dashboard/banner';

import Counter from './pages/dashboard/counter';
import Counters from './pages/dashboard/counter/counters';

import Service from './pages/dashboard/service';
import Services from './pages/dashboard/service/services';


import Social from './pages/dashboard/social';
import Socials from './pages/dashboard/social/socials';


import About from './pages/dashboard/about';
import Abouts from './pages/dashboard/about/abouts';

import Education from './pages/dashboard/education';
import Educations from './pages/dashboard/education/educations';


import Contact from './pages/dashboard/contact';
import Info from './pages/dashboard/info';
import Infos from './pages/dashboard/info/infos';

import Skill from './pages/dashboard/skills';
import SkillsList from './pages/dashboard/skills/skillsList';

import Experience from './pages/dashboard/experience';
import Experiences from './pages/dashboard/experience/experiences';

import Portfolio from './pages/dashboard/portfolio';
import Portfolios from './pages/dashboard/portfolio/portfolios';
import Upload from './pages/dashboard/upload';

import Account from './pages/account';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import FlashMessagesList from './components/flash/FlashMessagesList';
import PrivateRoute from './ui/PrivateRoute';
import {connect} from 'react-redux';
import Notfound from './pages/404';
import Banners from './pages/dashboard/banner/banners';
class App extends Component {
    render() {
        // console.log(this.props.auth);
        return (
            <Fragment>
                <FlashMessagesList/>
                <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                 

                    <PrivateRoute path="/banner" component={Banner} auth={this.props.auth}/>
                    
                    <PrivateRoute path="/upload" component={Upload} auth={this.props.auth}/>

                    <PrivateRoute path="/education" component={Education} auth={this.props.auth}/>
                    <PrivateRoute path="/educations" component={Educations} auth={this.props.auth}/>


                    <PrivateRoute path="/experience" component={Experience} auth={this.props.auth}/>
                    <PrivateRoute path="/experiences" component={Experiences} auth={this.props.auth}/>

                    <PrivateRoute path="/counter" component={Counter} auth={this.props.auth}/>
                    <PrivateRoute path="/counters" component={Counters} auth={this.props.auth}/>

                    <PrivateRoute path="/service" component={Service} auth={this.props.auth}/>
                    <PrivateRoute path="/services" component={Services} auth={this.props.auth}/>

                    <PrivateRoute path="/contact" component={Contact} auth={this.props.auth}/>
                    <PrivateRoute path="/info" component={Info} auth={this.props.auth}/>
                    <PrivateRoute path="/infos" component={Infos} auth={this.props.auth}/>

                    <PrivateRoute path="/skill" component={Skill} auth={this.props.auth}/>
                    <PrivateRoute path="/skills" component={SkillsList} auth={this.props.auth}/>

                    <PrivateRoute path="/portfolio" component={Portfolio} auth={this.props.auth}/>
                    <PrivateRoute path="/portfolios" component={Portfolios} auth={this.props.auth}/>


                    <PrivateRoute path="/about" component={About} auth={this.props.auth} />
                    <PrivateRoute path="/abouts" component={Abouts} auth={this.props.auth}/>

                    <PrivateRoute path="/social" component={Social} auth={this.props.auth}/>
                    <PrivateRoute path="/socials" component={Socials} auth={this.props.auth}/>

                    <PrivateRoute path="/banners" component={Banners} auth={this.props.auth}/>
                    <PrivateRoute path="/dashboard" component={Dashboard} auth={this.props.auth}/>
                    <PrivateRoute path="/account" component={Account} auth={this.props.auth}/>
                    <Route path="*" component={Notfound} />
                   
                </Switch>
                </Router>

            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(mapStateToProps)(App);
