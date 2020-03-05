import Axios from 'axios';
import * as Types from './types';


export const createCV = (cv, addFlashMessage) => dispatch => {
    Axios.post('/api/cvs/', cv)
        .then((res) => {
            dispatch({
                type: Types.CREATE_CV,
                payload: {
                  id: res.data._id,
                  ...res.data
                }
            });
            addFlashMessage({
                type: 'success',
                text: res.data.message
            })
  
        })
        .catch(error => {
            dispatch({
                type: Types.ERROR_CV,
                payload: {
                    error: error.response.data
                }
            })
        })
  }
  
  export const updateCV = (id, cv, addFlashMessage, props) => dispatch => {
    Axios.put(`/api/cvs/${id}`, cv)
      .then(res => {
        dispatch({
          type: Types.UPDATE_CV,
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
          type: Types.ERROR_CV,
          payload: {
            error: error.response.data
          }
        });
        
      });
  };

  export const loadCV = () => dispatch => {
    Axios.get("/api/cvs/")
      .then(response => {
        dispatch({
          type: Types.LOAD_CV,
          payload: {
            erorr: {},
            cvs: response.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_CV,
          payload: {
            error: error.response.data
          }
        });
      });
  };

  export const removeCV = id => dispatch => {
    Axios.delete(`/api/cvs/${id}`)
      .then(res => {
        dispatch({
          type: Types.REMOVE_CV,
          payload: {
            id: res.data._id,
            ...res.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_ABOUT,
          payload: {
            error: error.response.data
          }
        });
      });
  };