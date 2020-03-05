import React, { Component } from 'react'
import {connect} from 'react-redux';
import { loadSkills, removeSkills } from "../../../store/actions/skillsActions";
import  UpdateSkills from './updateSkills';
import { Link } from 'react-router-dom';
 class SkillsList extends Component {


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
        this.props.loadSkills();
    }
  

  
    render() {

     

       let { skills } = this.props.skills;

    
        return this.props.auth.isAdmin ? (
            <div className="container-fluid"> 
              
                <div className="row">
                    <div className="col-sm-12">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h4 className="page-title mb-0">Dashboard</h4>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to={'/skill'}>Skills Create</Link> </li>
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
                            <h4 className="mt-0 header-title">Latest Info</h4>
                            <div className="table-responsive mt-4">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">(#) Id</th>
                                            <th scope="col">Extra Title</th>
                                            <th scope="col">Professional Skills</th>
                                            <th scope="col">Programing language</th>
                                            <th scope="col">Language Skills</th>
                                            <th scope="col">Status</th>
                                            <th scope="col" className='text-center'>Actions</th>
                                      
                                            
                                        </tr>
                                    </thead>

 
                                  { (Array.isArray(skills) && skills.length) > 0 ? 
                                    <tbody>
                                    {
                                        skills.map((skill, index) => {
                                        
                                            let count = index + 1;
                                       
                                                return(
                                                <tr key={skill._id}>
                                            <th scope="row">#{count}</th>
                                        
                                       
                                            <td className='w-25'>
                                            {

                                                skill.extra_skills.length > 0 ?
                                                skill.extra_skills.map((extra_skill, index) => (
                                                <span key={index}>{`${extra_skill.length >0 ? extra_skill+ ' , ' : extra_skill }`}</span>
                                                )) : <span>No extra skill </span>
                                                }
                                            
                                            </td>

                                            
                                            <td className='w-25'>
                                            {

                                                skill.professional_skills.length > 0 ?
                                                skill.professional_skills.map((professional_skill, index)=> (

                                                <span key={index}>{`${professional_skill.prof_progress_title}-${professional_skill.prof_progress}`} ,  </span>
                                                )) : <span>No extra skill </span>
                                                }
                                            
                                            </td>

                                           

                                            <td>
                                            {

                                                skill.programming_skills.length > 0 ?
                                                skill.programming_skills.map((programming_skill, index)=> (

                                                <span key={index}>{`${programming_skill.programming_lang_title}-${programming_skill.programming_lang_progress}`} ,  </span>
                                                )) : <span>No programming skill </span>
                                                }
                                            
                                            </td>

                                            <td>
                                            {

                                                skill.language_skills.length > 0 ?
                                                skill.language_skills.map((language_skill, index)=> (

                                                <span key={index}>{`${language_skill.lang_title}-${language_skill.lang_progress}`} ,  </span>
                                                )) : <span>No extra skill </span>
                                                }
                                            
                                            </td>


                                            <td>{skill.status =='publish' ? <span className="badge badge-success">{skill.status}</span> : <span className="badge badge-danger">{skill.status}</span> }</td>
                                            <td className='text-center'>
                                            
                                            {this.state.id === skill._id?   <UpdateSkills show={this.state.updateModalOpen}
        onHide={this.closeUpdateModal}  skill={skill} /> : null }


                                                    <button className='btn btn-primary btn-sm m-1' onClick={() => this.openUpdateModal(skill._id)} >Edit</button>
                                                    <button className='btn btn-danger btn-sm m-1' onClick={ ()=> { this.props.removeSkills(skill._id)}} >Delete</button>
                                                  
                                            </td>
                                        </tr>
                                            )
                                            

                                          
                                        })
                                    }
                                 </tbody> : <tbody><tr>
                                     <td>
                                     <p>There is no Skills</p>
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
    skills: state.skill,
    auth: state.auth
})

export default connect(mapStateToProps, { loadSkills, removeSkills })(SkillsList)
