import React, { Component } from 'react';
import Header from '../layouts/Header';
import HeroBanner from '../components/home/banner';
import Counter from '../components/home/counter';
import About from '../components/home/about';
import Experience from '../components/home/experience';
import Skills from '../components/home/skills';
import Services from '../components/home/service';
import Portfolios from '../components/home/portfolio';
import Contact from '../components/home/contact';
import SocialMedia from '../components/home/social-media';
import Footer from '../layouts/Footer';
export default class Home extends Component {
    render() {
        return (
          
        <div className="wrapper">
        <Header/> 
        <HeroBanner/>
        <Counter/>
        <About/>
        <Experience/>
        <Skills/>
        <Services/>
        <Portfolios/>
        <Contact/>
        <SocialMedia/>
        <Footer/>
        </div>
        )
    }
}
