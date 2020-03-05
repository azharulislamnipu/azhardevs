import React, { Component } from 'react';
import logo from '../img/mylogoblack.png';
import { MdHome} from "react-icons/md";
import { IoIosHeart} from "react-icons/io";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import {register} from '../store/actions/authActions';
import { addFlashMessage } from '../store/actions/flashMessages';

class Register extends Component {
   //name , email, password, confirmPassword, error

   constructor(props){
    super(props);


    this.state ={
      name:'',
      email:'',
      password:'',
      confrimPassword:'',
      error:{}
  }
  }


  changeHandler = event =>{

      this.setState({
          [event.target.name]:event.target.value
      })
  }
  submitHandler = event => {
      event.preventDefault();
      let { name, email, password, confrimPassword } = this.state;
      this.props.register( { name, email, password, confrimPassword }, this.props.history, this.props.addFlashMessage);
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
  render() {
    let {name, email, password, confrimPassword, error} = this.state;

  

    return (
     
  <div className="accountbg">
        <div className="home-btn d-none d-sm-block">
            <a href="/" className="text-white"><MdHome/></a>
        </div>
        <Container>
        <Row>
        <Col lg={12} md={12} sm={12} className='vh-100 d-flex align-items-center col justify-content-center'>
  
        <div className="wrapper-page">

            <div className="card">
                <div className="card-body">

                    <div className="p-3">
                        <div className="float-right text-right">
                            <h4 className="font-18 mt-3 m-b-5">Free Register</h4>
                            <p className="text-muted">Sign Up to continue to <span className="theme-color">Azhardevs.</span></p>
                        </div>
                        <a href="#" className="logo-admin"><img src={logo} alt="logo"/></a>
                    </div>

                    <div className="p-3">
                        
                          <Form  onSubmit={this.submitHandler}>

                            <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name='name' placeholder="Enter Your Name " value={name} 
                            onChange={this.changeHandler} isInvalid={!!error.name} />

                              {error.name && (
                                 <span className= {error.name ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                 {error.name}
                             </span>
                              )}
            
                            </Form.Group>

                            <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='email'  placeholder="Enter Your Email" value={email}
                             onChange={this.changeHandler} isInvalid={!!error.email} autoComplete="new-email" />
                                {error.email && ( <span className= {error.email ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                {error.email}
                                </span>  )}

                                {error.message && ( <span className= {error.message ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                {error.message}
                                </span>  )}
                         
                            </Form.Group>


                            <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="Enter Your Password" value={password} 
                            onChange={this.changeHandler} isInvalid={!!error.password}  autoComplete="new-password"/>
                              {error.password && (<span className= {error.password ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                {error.password}
                            </span> )}
                            </Form.Group>

                            
                            <Form.Group controlId="confrimPassword">
                            <Form.Label>Conformation Password</Form.Label>
                            <Form.Control type="password" name='confrimPassword' placeholder="Enter Your Conformation Password" 
                            value={confrimPassword} onChange={this.changeHandler} isInvalid={!!error.confrimPassword}  autoComplete="new-password"/>
                             {error.confrimPassword && (<span className= {error.confrimPassword ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                {error.confrimPassword}
                            </span>)}
                            </Form.Group>

                            <Form.Group  className='row'>
                                <div className="col-sm-12 text-right">
                                    <button className="btn submit-btn btn-primary" type="submit">Register</button>
                                </div>
                            </Form.Group>

                         
                            <Form.Group className='row'>
                            <div className="col-12">
                                    <p className="font-14 text-center text-muted mb-0">By registering you agree to the Azhardevs <a href="#" className="theme-color">Terms of Use</a></p>
                                </div>
                            </Form.Group>
                            </Form>
                    </div>

                </div>
            </div>

            <div className="m-t-40 text-center text-white-50">
                <p>Already have an account ? <a href="/login" className="font-600 text-white"> SignIn Now </a> </p>
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
export default connect(mapStateToProps,{register,addFlashMessage})(Register);