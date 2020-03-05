import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createLogo, loadLogo, removeLogo } from "../../../store/actions/logoActions";
import { createCV, loadCV, removeCV } from "../../../store/actions/cvActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
import UpdateCV from "./updateCv";
import UpdateLogo from "./updateLogo";
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateModalOpen: false,
        id: '',
      about_image: "",
 
      logo_name: "",
      logo: "",

      cv_name: '',
      cv:'',
      status:'publish',
      error: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filehander = this.filehander.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  openUpdateModal = (id) => {
    this.setState({
        updateModalOpen: true,
        id
    })
}

closeUpdateModal = () => {
    this.setState({
        updateModalOpen: false,
        id: ''
    })
}


  componentDidMount(){
    this.props.loadCV();
    this.props.loadLogo();
}

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.logos.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.logos.error
      };
    }
    return null;
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.cvs.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.cvs.error
      };
    }
    return null;
  }

  handleChange(e) {
    this.setState({
      status: e.target.value
    });
  }
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  filehander = e => {
    this.setState({ logo: e.target.files });
    this.setState({ logo_name: e.target.files[0].name });
  };

  cvhandler = e => {
    this.setState({ cv: e.target.files });
    this.setState({ cv_name: e.target.files[0].name });
  };

  submitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("logo_name", this.state.logo_name);
    formData.append("logo", this.state.logo[0]);
    formData.append("status", this.state.status);
     this.props.createLogo(formData, this.props.addFlashMessage);

    
    
  }

  cvsubmitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("cv_name", this.state.cv_name);
    formData.append("cv", this.state.cv[0]);
    formData.append("status", this.state.status);
    this.props.createCV(formData, this.props.addFlashMessage);
    
  }

  render() {
    let {
      logo, cv, status,
      error
    } = this.state;
    let {cvs} = this.props.cvs;
     let {logos} = this.props.logos;



    return this.props.auth.isAdmin ? (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="page-title mb-0">Dashboard</h4>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      upload
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h2 className="text-uppercase text-center">Upload Logo</h2>

                <Form
                  onSubmit={this.submitHandler}
                  method="post"
                  encType="multipart/form-data"
                >
                

                  <Form.Group controlId="image">
                    <Form.Label>Logo Image Upload</Form.Label>

                    <Form.Control
                      type="file"
                      name="logo"
                      onChange={this.filehander}
                    />
                    {error.logo_name && (
                      <span
                        className={
                          error.logo_name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.logo_name}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="controllerstatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      onChange={this.handleChange}
                      value={status}
                    >
                      <option value="publish">Publish</option>
                      <option value="revoke">Revoke</option>
                    </Form.Control>
                  </Form.Group>

                

                  <Form.Group className="row">
                    <div className="col-sm-12 text-left">
                
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create Logo
                      </button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>


                 

        <div className="row">
                 <div className="col-12">

                 <div className="card">
                        <div className="card-body">
                            <h4 className="mt-0 header-title">Latest CV</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Logo</th>
                                            <th scope="col">Logo Name</th>
                                      
                                            <th scope="col">status</th>
                                   
                                            <th scope="col" className='text-center'>Actions</th>
                                      
                                            
                                        </tr>
                                    </thead>

                                    { (Array.isArray(logos) && logos.length) > 0 ? 
                                    <tbody>
                                    {
                                      logos.map((logo, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={logo._id}>
                                            <th scope="row">#{count}</th>

                                        

                                            <td>
                                            <img src={logo.logo_url} className="thumb-lg rounded-circle mr-2" alt={logo.logo_name}/> 
                                              
                                                </td>
                                         
                                                <td>
                                                
                                                <p>{logo.logo_name}</p>
                                             </td>
                                        
                                            <td>{logo.status =='publish' ? <span className="badge badge-success">{logo.status}</span> : <span className="badge badge-danger">{logo.status}</span> }</td>
                                            <td>
                                          

                                            {this.state.id === logo._id?   <UpdateLogo show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  logo={logo} error={this.state.error} /> : null }


                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(logo._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeLogo(logo._id)}} >Delete</button>
                                                   
                                                
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr><td><p>There is no Logo</p></td></tr></tbody>}

                                </table>
                            </div>
                        </div>
                    </div>

                 
                 
                 </div>
             </div>



        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h2 className="text-uppercase text-center">UPLOAD CV</h2>

                <Form
                  onSubmit={this.cvsubmitHandler}
                  method="post"
                  encType="multipart/form-data"
                >
                

                  <Form.Group controlId="cv">
                    <Form.Label>CV Upload</Form.Label>

                    <Form.Control
                      type="file"
                      name="cv"
                      onChange={this.cvhandler}
                    />
                    {error.cv_name && (
                      <span
                        className={
                          error.cv_name
                            ? "invalid-feedback d-block"
                            : "invalid-feedback"
                        }
                      >
                        {error.cv_name}
                      </span>
                    )}
                  </Form.Group>
                  
                  <Form.Group controlId="status.controler">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      onChange={this.handleChange}
                      value={status}
                    >
                      <option value="publish">Publish</option>
                      <option value="revoke">Revoke</option>
                    </Form.Control>
                  </Form.Group>

                

                  <Form.Group className="row">
                    <div className="col-sm-12 text-left">
                    
                      <button
                        className="btn submit-btn btn-primary"
                        type="submit"
                      >
                        Create CV
                      </button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      
      
            <div className="row">
                 <div className="col-12">

                 <div className="card">
                        <div className="card-body">
                            <h4 className="mt-0 header-title">Latest CV</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">CV Name</th>
                                            <th scope="col">Download</th>
                                      
                                            <th scope="col">status</th>
                                   
                                            <th scope="col" className='text-center'>Actions</th>
                                      
                                            
                                        </tr>
                                    </thead>

                                    { (Array.isArray(cvs) && cvs.length) > 0 ? 
                                    <tbody>
                                    {
                                      cvs.map((cv, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={cv._id}>
                                            <th scope="row">#{count}</th>

                                            <td>
                                                
                                                 <p>{cv.cv_name}</p>
                                              </td>

                                            <td>
                                                
                                                <a href={cv.cv_url} className='btn btn-success' target='_blank'> download</a>
                                                
                                                </td>
                                         
                                          
                                        
                                            <td>{cv.status =='publish' ? <span className="badge badge-success">{cv.status}</span> : <span className="badge badge-danger">{cv.status}</span> }</td>
                                            <td>
                                          

                                            {this.state.id === cv._id?   <UpdateCV show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  cv={cv} error={this.state.error} /> : null }



        
                                    
                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(cv._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeCV(cv._id)}} >Delete</button>
                                                   
                                                
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                   <td>
                                   <p>There is no CV</p>
                                   </td>
                                 </tr></tbody>}

                                </table>
                            </div>
                        </div>
                    </div>

                 
                 
                 </div>
             </div>

             

      </div>
    ) : (
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-sm-12 text-center">
            <div className="card pt-5 pb-5">
              <div className="card-body">
                <h1>Opps.....! Sorry 😞</h1>
                <h3>It Only admin can Access </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  logos: state.logo,
  cvs: state.cv,
  auth: state.auth
});

export default connect(mapStateToProps, { createCV , loadCV, removeCV, createLogo, loadLogo, removeLogo, addFlashMessage})(
  Upload
);
