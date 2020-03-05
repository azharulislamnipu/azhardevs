import React, { Component } from 'react'
import {connect} from 'react-redux';
import {  loadService, removeService } from '../../../store/actions/serviceActions';
import  UpdateService from './updateService';
import { Link } from 'react-router-dom';
 class Counters extends Component {


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
        this.props.loadService();
    }
  

  
    render() {

       let { services } = this.props.services;
    
        return this.props.auth.isAdmin ? (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to={'/service'}>Service</Link> </li>
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
                            <h4 className="mt-0 header-title">Latest Service</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Icon</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Status</th>
                                            <th scope="col" className='text-center'>Actions</th>

                                        </tr>
                                    </thead>

 
                                  { (Array.isArray(services) && services.length) > 0 ? 
                                    <tbody>
                                    {
                                        services.map((service, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={service._id}>
                                            <th scope="row">#{count}</th>
                                        
                                            <td>{service.title}</td>
                                            <td>{service.icon}</td>
                                            <td className='w-50'>{service.description}</td>
                                          
                                            <td>{service.status =='publish' ? <span className="badge badge-success">{service.status}</span> : <span className="badge badge-danger">{service.status}</span> }</td>
                                            <td className='text-center'>
                                            

                                            {this.state.id === service._id?   <UpdateService show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  service={service} /> : null }


                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(service._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeService(service._id)}} >Delete</button>
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                     <td>
                                     <p>There is no Counter</p>
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
    services: state.service,
    auth: state.auth
})

export default connect(mapStateToProps, { loadService, removeService })(Counters)
