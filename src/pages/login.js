import React, { Component } from 'react';
import logo from '../img/mylogoblack.png';
import { MdHome,MdLock} from "react-icons/md";
import { IoIosHeart} from "react-icons/io";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import {login} from '../store/actions/authActions';
import { addFlashMessage } from '../store/actions/flashMessages';
class Login extends Component {
  
state ={
email:'',
password:'',
error:{}
}


static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.auth.error
      };
    }
    return null;
  }

changeHandler = event =>{

    this.setState({
        [event.target.name]:event.target.value
    })
}
submitHandler = event => {
    event.preventDefault();
       let {  email, password } = this.state;

    
      this.props.login({ email, password}, this.props.history);
} 


  render() {
    let { email, password, error} = this.state;


    return (
     
  <div className="accountbg">
  <div className="home-btn d-none d-sm-block">
      <a href="/" className="text-white"><MdHome/></a>
  </div>

       <Container >
        <Row className='h-100' >
        <Col lg={12} md={12} sm={12} className='vh-100 d-flex align-items-center col justify-content-center'>

        <div className="wrapper-page">

            <div className="card">
                <div className="card-body">

                    <div className="p-3">
                        <div className="float-right text-right">
                            <h4 className="font-18 mt-3 m-b-5">Welcome Back !</h4>
                            <p className="text-muted">Sign in to continue to <span className="theme-color">Azhardevs.</span></p>
                        </div>
                        <a href="#" className="logo-admin"><img src={logo} alt="logo"/></a>
                    </div>

                    <div className="p-3">

                    <Form  onSubmit={this.submitHandler}>

                        <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' autoComplete="new-email"  placeholder="Enter Your Email" value={email} onChange={this.changeHandler} />
                        
                        {error.email && (
                                 <span className= {error.email ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                 {error.email}
                             </span>
                              )}
                               

                        </Form.Group>


                        <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' autoComplete="new-password" placeholder="Enter Your Password" value={password} onChange={this.changeHandler} />
                        {error.password && (
                                 <span className= {error.password ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                 {error.password}
                             </span>
                              )}

                              {error.message && ( <span className= {error.message ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                {error.message}
                                </span>  )}
                        
                        </Form.Group>
                        <Form.Group className='row'>
                                <div className="col-sm-6">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                                        <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                    </div>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <button className="btn submit-btn btn-primary" type="submit">Log In</button>
                                </div>
                        </Form.Group>

                        <Form.Group  className='row'>
                                <div className="col-12 text-center">
                                    <a href="pages-recoverpw.html" className="text-muted"><MdLock/> Forgot your password?</a>
                                </div>
                        </Form.Group>
                    </Form>

                    </div>

                </div>
            </div>

            <div className="m-t-40 text-center text-white-50">
                <p>Don't have an account ? <a href="/register" className="font-600 text-white"> Signup Now </a> </p>
                <p>©2019 Azhardevs. Crafted with <IoIosHeart className="text-danger"/>  by Azharul Islam</p>
            </div>

        </div>

        </Col>
        </Row>
        </Container>

</div>
 
    )
  }
}
 const mapStateToProps = state => ({
    auth: state.auth,
    addFlashMessage
 });
export default connect(mapStateToProps,{login})(Login);