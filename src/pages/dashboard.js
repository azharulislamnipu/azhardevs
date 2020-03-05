import React, { Component } from 'react'
import {connect} from 'react-redux';
import {loadUsers} from '../store/actions/userActions';
import { Link } from 'react-router-dom';
class DashBoard extends Component {
  
    componentDidMount(){
        this.props.loadUsers()
    }
  

  render() {

     let {users} = this.props.users
    const userItem =
    users.length > 0 ? (
        users.map((user, key) => {
            let count = key + 1;
          return (
    
                                        <tr key={key}>
                                            <th scope="row">#{count}</th>
                                            <td>
                                                <div>
                                                    {user.avatar ? <img src={user.avatar} alt="" className="thumb-sm rounded-circle mr-2"/>: null}{user.name}
                                                </div>
                                            </td>
                                            <td>{user.create_at}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <div>
                                                    <a href="#" className="btn btn-danger btn-sm">Delete</a>
                                                </div>
                                            </td>
                                        </tr>
                                        
          )
        
      })
    ) : (
           <tr>
               <td>
               <span>No info Data Available</span>
               </td>
           </tr>
    );


    return this.props.auth.isAdmin ?  (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                         <li className="breadcrumb-item"><Link to='/dashboard'>azhardevs</Link> </li>
                                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                

                {/* <div class="row">
                    <div class="col-xl-3 col-md-6">
                        <div class="card mini-stats">
                            <div class="p-3 mini-stats-content">
                                <div class="mb-4">
                                    <div class="float-right text-right">
                                        <span class="badge badge-light text-info mt-2 mb-2"> + 11% </span> 
                                        <p class="text-white-50">From previous period</p>
                                    </div>
                                    
                                    <span class="peity-pie" data-peity='{ "fill": ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.2)"]}' data-width="54" data-height="54">5/8</span>
                                </div>
                            </div>
                            <div class="ml-3 mr-3">
                                <div class="bg-white p-3 mini-stats-desc rounded">
                                    <h5 class="float-right mt-0">1758</h5>
                                    <h6 class="mt-0 mb-3">Orders</h6>
                                    <p class="text-muted mb-0">Sed ut perspiciatis unde iste</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card mini-stats">
                            <div class="p-3 mini-stats-content">
                                <div class="mb-4">
                                    <div class="float-right text-right">
                                        <span class="badge badge-light text-danger mt-2 mb-2"> - 27% </span> 
                                        <p class="text-white-50">From previous period</p>
                                    </div>
                                    
                                    <span class="peity-donut" data-peity='{ "fill": ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.2)"], "innerRadius": 18, "radius": 32 }' data-width="54" data-height="54">2/5</span>
                                </div>
                            </div>
                            <div class="ml-3 mr-3">
                                <div class="bg-white p-3 mini-stats-desc rounded">
                                    <h5 class="float-right mt-0">48259</h5>
                                    <h6 class="mt-0 mb-3">Revenue</h6>
                                    <p class="text-muted mb-0">Sed ut perspiciatis unde iste</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card mini-stats">
                            <div class="p-3 mini-stats-content">
                                <div class="mb-4">
                                    <div class="float-right text-right">
                                        <span class="badge badge-light text-primary mt-2 mb-2"> 0% </span> 
                                        <p class="text-white-50">From previous period</p>
                                    </div>
                                    
                                    <span class="peity-pie" data-peity='{ "fill": ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.2)"]}' data-width="54" data-height="54">3/8</span>
                                </div>
                            </div>
                            <div class="ml-3 mr-3">
                                <div class="bg-white p-3 mini-stats-desc rounded">
                                    <h5 class="float-right mt-0">$17.5</h5>
                                    <h6 class="mt-0 mb-3">Average Price</h6>
                                    <p class="text-muted mb-0">Sed ut perspiciatis unde iste</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card mini-stats">
                            <div class="p-3 mini-stats-content">
                                <div class="mb-4">
                                    <div class="float-right text-right">
                                        <span class="badge badge-light text-info mt-2 mb-2"> - 89% </span> 
                                        <p class="text-white-50">From previous period</p>
                                    </div>
                                    <span class="peity-donut" data-peity='{ "fill": ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.2)"], "innerRadius": 18, "radius": 32 }' data-width="54" data-height="54">3/5</span>
                                </div>
                            </div>
                            <div class="ml-3 mr-3">
                                <div class="bg-white p-3 mini-stats-desc rounded">
                                    <h5 class="float-right mt-0">2048</h5>
                                    <h6 class="mt-0 mb-3">Product Sold</h6>
                                    <p class="text-muted mb-0">Sed ut perspiciatis unde iste</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               */}

                <div className="row">
                            <div className="col-xl-12 text-center">
                                <div className="card">
                                    <div className="card-body">
                                    <h2>Welcome To Dashboard Page</h2>

                                          
                                    </div>
                                </div>
                            </div>  
                        </div>


               <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mt-0 header-title">Latest Users</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            
                                            <th scope="col" colSpan="2">Action</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {userItem}
                                        
                                     
                                   
                                    </tbody>
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
    auth: state.auth,
    users:state.users
 });
export default connect(mapStateToProps, { loadUsers })(DashBoard)