import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { loadEducation, removeEducation } from "../../../store/actions/educationActions";
import UpdateEducation from './updateEducation';
 class Educations extends Component {

    state = {
        updateModalOpen: false,
        id: ''
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
        this.props.loadEducation();
    }
  

  
    render() {

       let { educations } = this.props.educations;


        return this.props.auth.isAdmin ?  (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to={'/education'}>Education</Link> </li>
                                        <li className="breadcrumb-item active" aria-current="page">List</li>
                                    </ol>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                


            
                <div className="row">
                 <div className="col-12">
                 <div className="card">
                        <div className="card-body">
                            <h4 className="mt-0 header-title">Latest Educations</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Organization Name</th>
                                            <th scope="col">Program Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col" className='text-center'>Actions</th>
                                        </tr>
                                    </thead>

 
                                  { (Array.isArray(educations) && educations.length) > 0 ? 
                                    <tbody>
                                    {
                                        educations.map((education, index) => {
                                        
                                            let count = index + 1;
                                           let start_date = new Date(education.start_date);
                                           start_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(start_date);

                                           let end_date = new Date(education.end_date);
                                           end_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(end_date);
                                                return(
                                                <tr key={education._id}>
                                            <th scope="row">#{count}</th>
                                        
                                            <td>{education.organization_name}</td>
                                            <td>{education.program_title}</td>
                                            <td className='w-25'>
                                            {education.description}
                                            
                                            </td>
                                            <td>
                                            {start_date}
                                            
                                            </td>
                                            <td>
                                            {end_date}
                                            
                                            </td>
                                            <td>{education.status =='publish' ? <span className="badge badge-success">{education.status}</span> : <span className="badge badge-danger">{education.status}</span> }</td>
                                            <td className='text-center'>
                                            

                                            {this.state.id === education._id?   <UpdateEducation show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  education={education} /> : null }


                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(education._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeEducation(education._id)}} >Delete</button>
                                                  
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                     <td>
                                     <p>There is no Education</p>
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
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-sm-12 text-center">
              <div class="card pt-5 pb-5">
                <div class="card-body">
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
    auth: state.auth,
    educations: state.education
})

export default connect(mapStateToProps, { loadEducation, removeEducation })(Educations)
