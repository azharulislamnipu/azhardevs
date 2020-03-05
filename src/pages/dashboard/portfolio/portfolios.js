import React, { Component } from 'react'
import {connect} from 'react-redux';
 import {loadPortfolios , removePortfolio} from '../../../store/actions/portfolioActions';
import { Link } from "react-router-dom";
import UpdatePortfolio from "./updatePortfolio";
import ViewDetails from "./viewDetails";

 class Portfolios extends Component {

    state = {
        updateModalOpen: false,
        viewModalOpen: false,
        error:'',
        id: ''
    }

      static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.portfolios.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.portfolios.error
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
        this.props.loadPortfolios();
    }


    render() {
        let { portfolios } = this.props.portfolios;
 
        return this.props.auth.isAdmin ? (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                         <li className="breadcrumb-item"><Link to={'/portfolio'}>Portfolio</Link> </li>
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
                            <h4 className="mt-0 header-title">Latest Portfolio</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Feature Image</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Project Type</th>
                                            <th scope="col">Created By</th>
                                            <th scope="col">status</th>
                                   
                                            <th scope="col" className='text-center'>Actions</th>
                                      
                                            
                                        </tr>
                                    </thead>

                                    { (Array.isArray(portfolios) && portfolios.length) > 0 ? 
                                    <tbody>
                                    {
                                        portfolios.map((portfolio, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={portfolio._id}>
                                            <th scope="row">#{count}</th>
                                            <td>
                                                
                                                <img src={portfolio.image_url[0]} className="thumb-lg rounded-circle mr-2" alt={portfolio.feature_image}/>
                                                
                                                
                                                </td>
                                            <td>{portfolio.title}</td>
                                            <td className='w-25'>{portfolio.description}</td>
                                            <td>{portfolio.type}</td>
                                            <td>{portfolio.created_by}</td>
                                        
                                            <td>{portfolio.status =='publish' ? <span className="badge badge-success">{portfolio.status}</span> : <span className="badge badge-danger">{portfolio.status}</span> }</td>
                                            <td>
                                          

                                            {this.state.id === portfolio._id?   <UpdatePortfolio show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  portfolio={portfolio} error={this.state.error} /> : null }

        {this.state.id === portfolio._id?   <ViewDetails show={this.state.viewModalOpen}
        onHide={this.closeUpdateModal}   portfolio={portfolio} /> : null }

        
                                    
                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(portfolio._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removePortfolio(portfolio._id)}} >Delete</button>
                                                    <button className='btn btn-secondary btn-sm m-1'  onClick={() => this.openViewModal(portfolio._id)}  >View</button>
                                                
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                     <td>
                                     <p>There is no Portfolios</p>
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
    portfolios: state.portfolio,
    auth: state.auth
})

export default connect(mapStateToProps, { loadPortfolios, removePortfolio })(Portfolios)