import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Gellary from './gellary';


const GridderContent = (props) => {
    let {
        title,
        description,
        type,
        image_url,
        feature_image,
        client_name,
        created_by,
        completed_date,
        skills,
        preview_url
      } =  props.portfolio;


   
      const date = new Date(completed_date)
      completed_date =   new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
  return (
            
                    <div>
                <div className="gridder-content">
                    <div className="container-fluid">
                        <div className="row">
                        <Col lg={8} md={12} sm={12} >
                          
                                <div className="gridderGallery">
                                    <div id="gallery02" className="carousel slide" data-interval="3000" data-ride="carousel">
                                  
                                          { <Gellary gellary={props.portfolio.gellary_image} imageUrl={image_url}/>}
                        
                                  
                                    </div>
                                </div>
                           
                        </Col>
                        <Col lg={4} md={12} sm={12} >
                                <div className="project-details pt-65 pl-35">
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                    <div className="project-info mt-50">
                                        <ul>
                                            <li>
                                                <h5>Client</h5>
                                                <p>{client_name}</p>
                                            </li>
                                            <li>
                                                <h5>Created</h5>
                                                <p>{created_by}</p>
                                            </li>
                                            <li>
                                                <h5>Completed</h5>
                                                <p>{completed_date}</p>
                                            </li>
                                            <li>
                                                <h5>Skill</h5>
                                             
                                                {skills.map((value, index) => {
                                                return (
                                                   <p className='d-inline-block' key={index}> {value.length > 0 ?  <span> {value + ','} </span>:  <span>{value} </span>}</p>
                                                )})}
                                             
                                            </li>
                                        </ul>
                                    </div>
                                    {preview_url ?  <a className="btn sm-btn btn-primary" href={preview_url} target='_blank'>view project</a> : null }
                                   
                                </div>
                                </Col>
                        </div>
                    </div>
                </div>
                </div>
                
  )
}
export default GridderContent;