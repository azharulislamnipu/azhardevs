import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { loadBanners, removeBanner } from '../../../store/actions/bannerActions';
import  UpdateBanner from './updateBanner';

 class Banners extends Component {

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
        this.props.loadBanners()
    }
  
    render() {


       let { banners } = this.props.banners;


   
        return this.props.auth.isAdmin ? (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                      <li className="breadcrumb-item"><Link to='/banner'>Banner</Link> </li>
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
                            <h4 className="mt-0 header-title">Latest Banners</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Descrition</th>
                                            <th scope="col">Desination</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                      
                                            
                                        </tr>
                                    </thead>

 
                                  { (Array.isArray(banners) && banners.length) > 0 ? 
                                    <tbody>
                                    {
                                        banners.map((banner, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={index}>
                                            <th scope="row">#{count}</th>
                                            <td>
                                                <div>
                                                    <img src={`${banner.image_url}`} alt="" className="thumb-lg rounded-circle mr-2"/>
                                                </div>
                                            </td>
                                            <td>{banner.title}</td>
                                            <td>{banner.name}</td>
                                            <td>{banner.description}</td>
                                            <td>
                                            {

                                                banner.designation.length > 0 ?
                                                banner.designation.map((degintion, key) => (
                                                <span key={key}>{`${degintion.length >0 ? degintion+ ' , ' : degintion }`}</span>
                                                )) : <span>No Designation</span>
                                            }
                                            </td>
                                          
                                       

                                            <td>{banner.status =='publish' ? <span className="badge badge-success">{banner.status}</span> : <span className="badge badge-danger">{banner.status}</span> }</td>
                                            <td>
                                               
                                            {this.state.id === banner._id?   <UpdateBanner show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  banner={banner} /> : null }


                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(banner._id)} >Edit</button>
                                                    
                                                     <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeBanner(banner._id)}} >Delete</button>
                                           
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                     <td>
                                     <p>There is no Banner</p>
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
    banners: state.banner,
    auth: state.auth
})

export default connect(mapStateToProps, { loadBanners, removeBanner})(Banners)
