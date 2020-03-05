import Axios from 'axios';
import * as Types from './types';


export const createSkills = (skill, addFlashMessage, history) => dispatch => {
    Axios.post('/api/skills/', skill)
        .then((res) => {
            dispatch({
                type: Types.CREATE_SKILLS,
                payload: {
                    error:{},
                    skill: res.data
                }
            });
            history.push('/skills');
            addFlashMessage({
                type: 'success',
                text: res.data.message
            })
  
        })
        .catch(error => {
            dispatch({
                type: Types.ERROR_SKILLS,
                payload: {
                    error: error.response.data
                }
            })
        })
  }
  
  export const updateSkills = (id, skill, addFlashMessage, props) => dispatch => {
    Axios.put(`/api/skills/${id}`, skill)
      .then(res => {
        dispatch({
          type: Types.UPDATE_SKILLS,
          payload: {
              error: {},
              ...res.data
           }
        });
           addFlashMessage({
                type: 'success',
                text: res.data.message
            })
            if (res.data.message) {
                props.onHide();
            }
         
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_SKILLS,
          payload: {
            error: error.response.data
          }
        });
        
      });
  };

  export const loadSkills = () => dispatch => {
    Axios.get("/api/skills/")
      .then(response => {
        dispatch({
          type: Types.LOAD_SKILLS,
          payload: {
            erorr: {},
            skills: response.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_SKILLS,
          payload: {
            error: error.response.data
          }
        });
      });
  };

  export const removeSkills = id => dispatch => {
    Axios.delete(`/api/skills/${id}`)
      .then(res => {
        dispatch({
          type: Types.REMOVE_SKILLS,
          payload: {
            id: res.data._id,
            ...res.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_SKILLS,
          payload: {
            error: error.response.data
          }
        });
      });
  };