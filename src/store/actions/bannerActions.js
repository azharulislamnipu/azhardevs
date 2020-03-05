import Axios from 'axios';
import * as Types from './types';
 export const loadBanners = () => dispatch => {
        Axios.get('/api/banners/')
        .then(response => {
            dispatch({
                type: Types.LOAD_BANNER,
                payload: {
                    error:{},
                    banners: response.data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.BANNER_ERROR,
                payload: {
                    error:{}
                }
            })
        })
    }


export const createBanner = (banner, addFlashMessage, history) => dispatch => {
    Axios.post('/api/banners/', banner)
        .then((res) => {
            dispatch({
                type: Types.ADD_BANNER,
                payload: {
                    error:{},
                    banner: res.data
                }
            });
            history.push('/banners');
            addFlashMessage({
                type: 'success',
                text: res.data.message
            })
  
        })
        .catch(error => {
            dispatch({
                type: Types.BANNER_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
  }
  

  export const updateBanner = (id, banner, addFlashMessage, props) => dispatch => {
    Axios.put(`/api/banners/${id}`, banner)
      .then(res => {
        dispatch({
          type: Types.UPDATE_BANNER,
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
          type: Types.BANNER_ERROR,
          payload: {
            error: error.response.data
          }
        });
        
      });
  };



  export const removeBanner = id => dispatch => {
    Axios.delete(`/api/banners/${id}`)
    .then(res => {
        dispatch({
            type: Types.REMOVE_BANNER,
            payload: {
                id: res.data._id,
                ...res.data
            }})
    })
    .catch(error => {
        dispatch({
            type: Types.BANNER_ERROR,
            payload: {
                error: error.response.data
            }
        })
    })
  }