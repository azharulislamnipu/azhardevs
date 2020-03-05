import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBanner } from "../../../store/actions/bannerActions";
import { addFlashMessage } from "../../../store/actions/flashMessages";
class UpdateBanner extends Component {
  constructor(props) {
    super();
    this.state = {
        title:'',
        name:'',
        description:'',
        designation:[''],
        selectedFile:'',
        filename: '',
        image:'',
        current_image_url:'',
        status: '',
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

componentDidMount() {
  this.setState({
    title: this.props.banners.error.title?  this.state.title : this.props.banner.title,
    name:this.props.banners.error.name?  this.state.name : this.props.banner.name,
    description:this.props.banners.error.description?  this.state.description : this.props.banner.description,
    designation:this.props.banners.error.designation?  [...this.state.designation, ""] : this.props.banner.designation,
    image:this.props.banner.image,
    current_image_url:this.props.banner.image_url,
    status: this.props.banner.status
  });
}


submitHandler = event => {
    event.preventDefault();
    let {  title, name, description, designation,  current_cvname , current_image_url, status} = this.state;
   
    const formData = new FormData();
   
    formData.append('title', title);
    formData.append('name', name);
    formData.append('description', description);

    for (var i = 0; i < designation.length; i++) {
        formData.append('designation[]', designation[i]);
    }

    if(this.state.filename == ''){
      formData.append('image', this.state.image);
    }else{
      formData.append('image', this.state.selectedFile[0]);
    }

    formData.append('imagename', this.state.filename);
    formData.append('current_image_url', current_image_url);

    formData.append('status', status);

    this.props.updateBanner(this.props.banner._id, formData, this.props.addFlashMessage, this.props);


} 


  render() {
   
    let {  title, name, description, designation,  cv, current_cvname, image, current_imagename, status, error  } = this.state;
  

    return (
      <Modal
      show={this.props.show} onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="text-dark"> Update Banner</h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.submitHandler}>
          <Modal.Body>

          <Form.Group>
                                      <Form.Label>Title</Form.Label>
                                      <Form.Control type="text" name='title' autoComplete="new-title"  placeholder="Enter Your Title" value={title} onChange={this.changeHandler} />
                                      {error.title && (<span className= {error.title ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                            {error.title}
                                        </span>
                                        )}
                                      </Form.Group>

                                      <Form.Group>
                                      <Form.Label>Name</Form.Label>
                                      <Form.Control type="text" name='name' autoComplete="new-name"  placeholder="Enter Your Name" value={name} onChange={this.changeHandler} />
                                      {error.name && (<span className= {error.name ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                            {error.name}
                                        </span>
                                        )}
                                      </Form.Group>

                                      <Form.Group>
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
                                      
                                      <Form.Group>
                                      <Form.Label>Designation</Form.Label>
                                        <table className='w-100' >
                                          <tbody>
                                        {designation.map((value, index) => {
                                        return (

                                            <tr key={index}>
                                            <td className='w-100'>

                                            <Form.Control type="text" id={"degination_"+index}  className=' d-inline-block' placeholder='Enter Your designation' value={value} onChange={(e) => this.chanevalue(e, index)} />
                                        
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


                                      <Form.Group>
                                      <Form.Label>Image Upload</Form.Label>

                                      <Form.Control type="file" name='image'  onChange={this.filehander} />
                                      <Form.Control type="hidden" id="heddenimage" name='current_image_url'  value={current_imagename}/>
                                      {error.image && (<span className= {error.image ? 'invalid-feedback d-block' : 'invalid-feedback' } >
                                            {error.image}
                                        </span>
                                        )}
                                      </Form.Group>
         
            <Form.Group controlId="status.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={status}  onChange={this.handleChange.bind(this)}>
                <option value="publish">Publish</option>
                <option value="revoke">Revoke</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-dark ml-2" type="submit">
              Update
            </button>
            <button className="btn btn-danger" onClick={this.props.onHide}>
              Close
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  banners: state.banner
});

export default connect(mapStateToProps, { updateBanner, addFlashMessage })(UpdateBanner);