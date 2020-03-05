import React from 'react'
import CountUp from 'react-countup';
import IconGenerate from '../../../ui' 
import Col from 'react-bootstrap/Col';
const InfoItem = (props) => {
    
    let {title, info_icon, info_name} = props.info;


    const info_name_data =
    info_name.length > 0 ? (
        info_name.map((infoname, key) => {

            if(title == 'phone'){
                return <a  href={`tel:${infoname}`} key={key}>{infoname}</a>
            }else if(title == 'email'){
                return <a  href={`mailto:${infoname}`} key={key}>{infoname}</a>
            }else{
                return <span key={key}> {infoname} </span>
            }
            
        })
      ) : (
         <span>No info name</span>
      );

      

    if(title == 'phone'){

        return (
            <Col lg={4} md={4} sm={12}>
            <div className="conatact-info-box">
            <div className="conatact-icon"><i className={info_icon}></i></div>
            <div className="box-content">
                <h4 className="conatact-title">{title}:</h4>
                <div className="conatact-content">
                    {info_name_data}
                </div>
            </div>
            </div>
        </Col>
        )

    }else if(title == 'email'){

        return (
            <Col lg={4} md={4} sm={12}>
            <div className="conatact-info-box">
            <div className="conatact-icon"><i className={info_icon}></i></div>
            <div className="box-content">
                <h4 className="conatact-title">{title}:</h4>
                <div className="conatact-content">
                   {info_name_data}
              
                </div>
            </div>
            </div>
        </Col>
        )
    }else{
        return (
            <Col lg={4} md={4} sm={12}>
            <div className="conatact-info-box">
            <div className="conatact-icon"><i className={info_icon}></i></div>
            <div className="box-content">
                <h4 className="conatact-title">{title}:</h4>
                <div className="conatact-content">
                 <p>
                 {info_name_data}
                 </p>
                </div>
            </div>
            </div>
        </Col>
        )
    }
   

 
  
}
export default InfoItem;