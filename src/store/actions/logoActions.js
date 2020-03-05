import Axios from 'axios';
import * as Types from './types';

export const createLogo = (logo, addFlashMessage) => dispatch => {
    Axios.post('/api/logos/', logo)
        .then((res) => {
            dispatch({
                type: Types.CREATE_LOGO,
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
                type: Types.ERROR_LOGO,
                payload: {
                    error: error.response.data
                }
            })
        })
  }
  
  export const updateLogo = (id, logo, addFlashMessage, props) => dispatch => {
    Axios.put(`/api/logos/${id}`, logo)
      .then(res => {
        dispatch({
          type: Types.UPDATE_LOGO,
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
          type: Types.ERROR_LOGO,
          payload: {
            error: error.response.data
          }
        });
        
      });
  };

  export const loadLogo = () => dispatch => {
    Axios.get("/api/logos/")
      .then(response => {
        dispatch({
          type: Types.LOAD_LOGO,
          payload: {
            erorr: {},
            logos: response.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_LOGO,
          payload: {
            error: error.response.data
          }
        });
      });
  };

  export const removeLogo = id => dispatch => {
    Axios.delete(`/api/logos/${id}`)
      .then(res => {
        dispatch({
          type: Types.REMOVE_LOGO,
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