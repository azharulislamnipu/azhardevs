import Axios from 'axios';
import * as Types from './types';


export const createPortfolio = (portfolio, addFlashMessage, history) => dispatch => {
    Axios.post('/api/portfolios/', portfolio)
        .then((res) => {
            dispatch({
                type: Types.CREATE_PORTFOLIO,
                payload: {
                    error:{},
                    portfolio: res.data
                }
            });
            history.push('/portfolios');
            addFlashMessage({
                type: 'success',
                text: res.data.message
            })
  
        })
        .catch(error => {
            dispatch({
                type: Types.ERROR_PORTFOLIO,
                payload: {
                    error: error.response.data
                }
            })
        })
  }
  
  export const updatePortfolio = (id, portfolio ,addFlashMessage, props) => dispatch => {
    Axios.put(`/api/portfolios/${id}`, portfolio)
      .then(res => {
        dispatch({
          type: Types.UPDATE_PORTFOLIO,
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
          type: Types.ERROR_PORTFOLIO,
          payload: {
            error: error.response.data
          }
        });
        
      });
  };

  export const loadPortfolios = () => dispatch => {
    Axios.get("/api/portfolios/")
      .then(response => {
        dispatch({
          type: Types.LOAD_PORTFOLIO,
          payload: {
            erorr: {},
            portfolios: response.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_PORTFOLIO,
          payload: {
            error: error.response.data
          }
        });
      });
  };

  export const removePortfolio = id => dispatch => {
    Axios.delete(`/api/portfolios/${id}`)
      .then(res => {
        dispatch({
          type: Types.REMOVE_PORTFOLIO,
          payload: {
            id: res.data._id,
            ...res.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_PORTFOLIO,
          payload: {
            error: error.response.data
          }
        });
      });
  };