import React, { Component } from 'react'
import {connect} from 'react-redux';
import {  loadCounters, removeCounter } from '../../../store/actions/counterActions';
import  UpdateCounter from './updateCounter';
import { Link } from 'react-router-dom';
import ViewDetails from './viewDetails'
 class Counters extends Component {


    state = {
        updateModalOpen: false,
         viewModalOpen: false,
        id: ''
    }
    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }

        openViewModal = (id) => {
        this.setState({
            viewModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
             viewModalOpen: false,
            id: ''
        })
    }

    componentDidMount(){
        this.props.loadCounters();
    }
  

  
    render() {

       let { counters } = this.props.counters;
    
        return  this.props.auth.isAdmin ? (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to={'/counter'}>Counter</Link> </li>
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
                            <h4 className="mt-0 header-title">Latest Counter</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Counter Number</th>
                                            <th scope="col">Counter Icon</th>
                                            <th scope="col">Counter Duration</th>
                                            <th scope="col">Status</th>
                                          
                                            <th scope="col" className='text-center'>Actions</th>
                                      
                                            
                                        </tr>
                                    </thead>

 
                                  { (Array.isArray(counters) && counters.length) > 0 ? 
                                    <tbody>
                                    {
                                        counters.map((counter, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={counter._id}>
                                            <th scope="row">#{count}</th>
                                        
                                            <td>{counter.title}</td>
                                            <td>{counter.counter_number}</td>
                                            <td>{counter.counter_icon}</td>
                                            <td>{counter.duration}</td>
                                            <td>{counter.status =='publish' ? <span className="badge badge-success">{counter.status}</span> : <span className="badge badge-danger">{counter.status}</span> }</td>
                                            <td className='text-center'>
                                            

                                            {this.state.id === counter._id?   <UpdateCounter show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  counter={counter} /> : null }

             {this.state.id === counter._id?   <ViewDetails show={this.state.viewModalOpen}
        onHide={this.closeUpdateModal}   counter={counter} /> : null }

                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(counter._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeCounter(counter._id)}} >Delete</button>
                                                    <button className='btn btn-secondary btn-sm m-1'  onClick={() => this.openViewModal(counter._id)}  >View</button>
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                     <td><p>There is no Counter</p></td>
                                 </tr></tbody>}
                                </table>
                            </div>
                        </div>
                    </div>

                    
                 </div>
             </div>

             

           </div>
    ): (
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
    counters: state.counter,
    auth: state.auth
})

export default connect(mapStateToProps, { loadCounters, removeCounter })(Counters)
