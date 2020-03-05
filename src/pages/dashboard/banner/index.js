import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {connect} from 'react-redux';
import { createBanner } from '../../../store/actions/bannerActions';
import { addFlashMessage } from '../../../store/actions/flashMessages';
import { Link } from 'react-router-dom';


 class Banner extends Component {
    constructor(props) {
        super();
        this.state = {
            title:'',
            name:'',
            description:'',
            designation:[''],
            selectedFile:'',
            filename: '',
            status: "publish",
            error:{}
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }
  
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          JSON.stringify(nextProps.banners.error) !== JSON.stringify(prevState.error)
        ) {
          return {
            error: nextProps.banners.error
          };
        }
        return null;
      }

      handleChange = e => {
        this.setState({
          status: e.target.value
        });
      }

    addDesignation = e =>{

        this.setState({designation:[...this.state.designation, ""]})
    }
 

        removeDesignation = (sidx) => {
            if (sidx > 0) {
            this.setState({
                designation: this.state.designation.filter((s, idx) => idx !== sidx)
            });
            }
        
        };


    chanevalue = (event, index) => {
        this.state.designation[index] = event.target.value;
        this.setState({designation: this.state.designation});
    }

    changeHandler = event =>{

           this.setState({
               [event.target.name]: event.target.value
          })
            
    }



   filehander = e => {
    this.setState({selectedFile: e.target.files});
    this.setState({filename: e.target.files[0].name});
  };


    submitHandler = event => {
        event.preventDefault();
        let {  title, name, description, designation, cv , image, status} = this.state;
        const formData = new FormData();
       
        formData.append('title', title);
        formData.append('name', name);
        formData.append('description', description);
    
        for (var i = 0; i < designation.length; i++) {
            formData.append('designation[]', designation[i]);
        }

        formData.append('image', this.state.selectedFile[0]);
        formData.append('imagename', this.state.filename);
        formData.append('status', status);
    
        this.props.createBanner(formData, this.props.addFlashMessage, this.props.history);

    } 

  
    render() {
        let {  title, name, description, designation, image, status, error  } = this.state;

 
        return this.props.auth.isAdmin ? (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                         <li className="breadcrumb-item"><Link to="/banners">Banners</Link> </li>
                                        <li className="breadcrumb-item active" aria-current="page">Create</li>
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
                                    <h2 className="text-uppercase text-center">Create Banner</h2>


                                    <Form  onSubmit={this.submitHandler}  method="post"  encType="multipart/form-data">
                                        
                                      <Form.Group controlId="title">
                                      <Form.Label>Title</Form.Label>
                                      <Form.Control type="text" name='title' autoComplete="new-title"  placeholder="Enter Your Title" value={title} onChange={this.changeHandler} />
                                      {error.title && (<span className= {error.title ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                            {error.title}
                                        </span>
                                        )}
                                      </Form.Group>

                                      <Form.Group controlId="name">
                                      <Form.Label>Name</Form.Label>
                                      <Form.Control type="text" name='name' autoComplete="new-name"  placeholder="Enter Your Name" value={name} onChange={this.changeHandler} />
                                      {error.name && (<span className= {error.name ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                            {error.name}
                                        </span>
                                        )}
                                      </Form.Group>

                                      <Form.Group controlId="description">
                                      <Form.Label>Description</Form.Label>

                                      <Form.Control
                                      as="textarea"
                                      rows="4"
                                      name="description"
                                      autoComplete="new-description"
                                      placeholder="Enter Your Description"
                                      value={description}
                                      onChange={this.changeHandler}
                                    />

                                      {error.description && (<span className= {error.description ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                            {error.description}
                                        </span>
                                        )}
                                     
                                      </Form.Group>

                                      <Form.Group controlId="degination">
                                      <Form.Label>Designation</Form.Label>
                                        <table className='w-100' >
                                          <tbody>
                                        {designation.map((value, index) => {
                                        return (

                                            <tr key={index}>
                                            <td className='w-100'>

                                            <Form.Control type="text"  className=' d-inline-block' placeholder='Enter Your designation' value={value} onChange={(e) => this.chanevalue(e, index)} />
                                        
                                            </td>
                                            <td>
                                            {
                                                index ===0?<button onClick={(e) => { e.preventDefault(); this.addDesignation(e) }} type="button" className="btn btn-primary ml-2"><i className="fa fa-plus" aria-hidden="true"></i></button>
                                : <button type="button" className="btn btn-danger ml-2" onClick={() => this.removeDesignation(index)} ><i className="fa fa-close" aria-hidden="true"></i></button>
                                }
                                            </td>
                                        </tr>
                                        )
                                        })}
                                        </tbody>
                                        </table>
                                    
                                    </Form.Group>
                                    
                                   
                                      <Form.Group controlId="image">
                                      <Form.Label>Image Upload</Form.Label>

                                      <Form.Control type="file" name='image'  onChange={this.filehander} />
                                      {error.image && (<span className= {error.image ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                            {error.image}
                                        </span>
                                        )}
                                      </Form.Group>
                                                            
                                        <Form.Group controlId="status.ControlSelect1">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control
                                            as="select"
                                            name="status"
                                            onChange={this.handleChange.bind(this)}
                                            value={status}
                                            >
                                            <option value="publish">Publish</option>
                                            <option value="revoke">Revoke</option>
                                            </Form.Control>
                                        </Form.Group>

                                       <Form.Group className='row'>
                                           <div className="col-sm-12 text-right">
                                               <Link className="btn btn-primary mr-2" to='/banners'>View List</Link>
                                            <button className="btn submit-btn btn-primary" type="submit">Add Banner</button>
                                            </div>
                                       </Form.Group>

                                     </Form>
        

                                            

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
    banners: state.banner,
    auth: state.auth,
    addFlashMessage
})

export default connect(mapStateToProps, { createBanner, addFlashMessage})(Banner);
