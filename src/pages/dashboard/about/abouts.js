import React, { Component } from 'react'
import {connect} from 'react-redux';
 import {loadAbouts , removeAbout} from '../../../store/actions/aboutActions';
import { Link } from "react-router-dom";
import UpdateAbout from "./updateAbout";
import ViewDetails from "./viewDetails";
 class Abouts extends Component {

    state = {
        updateModalOpen: false,
        viewModalOpen: false,
        error:'',
        id: ''
    }

      static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.abouts.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.abouts.error
      };
    }
    return null;
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
        this.props.loadAbouts();
    }


    render() {
        let { abouts } = this.props.abouts;

        return   this.props.auth.isAdmin ?(
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                         <li className="breadcrumb-item"><Link to='/about'>About</Link> </li>
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
                            <h4 className="mt-0 header-title">Latest Abouts</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Sub Title</th>
                                            <th scope="col">About Info</th>
                                            <th scope="col">status</th>
                                   
                                            <th scope="col" className='text-center'>Actions</th>
                                      
                                            
                                        </tr>
                                    </thead>

                                    { (Array.isArray(abouts) && abouts.length) > 0 ? 
                                    <tbody>
                                    {
                                        abouts.map((about, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={index}>
                                            <th scope="row">#{count}</th>
                                            <td><img src={about.about_image_url} className="thumb-lg rounded-circle mr-2" alt="about-image"/></td>
                                            <td>{about.title}</td>
                                            <td>{about.sub_title}</td>
                                            <td className='w-25'>{about.about_info}</td>
                                        
                                            <td>{about.status =='publish' ? <span className="badge badge-success">{about.status}</span> : <span className="badge badge-danger">{about.status}</span> }</td>
                                            <td>
                                          

                                            {this.state.id === about._id?   <UpdateAbout show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  bio={about.bio} about={about} error={this.state.error} /> : null }

        {this.state.id === about._id?   <ViewDetails show={this.state.viewModalOpen}
        onHide={this.closeUpdateModal}  bio={about.bio} about={about} /> : null }

        
                                    
                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(about._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeAbout(about._id)}} >Delete</button>
                                                    <button className='btn btn-secondary btn-sm m-1'  onClick={() => this.openViewModal(about._id)}  >View</button>
                                                
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                     <td><p>There is no About</p></td>
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
    abouts: state.about,
    auth: state.auth
})

export default connect(mapStateToProps, { loadAbouts, removeAbout })(Abouts)