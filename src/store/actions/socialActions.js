import Axios from "axios";
import * as Types from "./types";

export const loadSocials = () => dispatch => {
  Axios.get("/api/socials/")
    .then(response => {
      dispatch({
        type: Types.LOAD_SOCIAL,
        payload: {
          erorr: {},
          socials: response.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_SOCIAL,
        payload: {
          error: error.response.data
        }
      });
    });
};
export const creatSocial = (social, addFlashMessage, history) => dispatch => {
    Axios.post("/api/socials/", social)
      .then(res => {
        dispatch({
          type: Types.CREATE_SOCIAL,
          payload: {
            error: {},
            social: res.data
          }
        });
        history.push("/socials");
        addFlashMessage({
          type: "success",
          text: res.data.message
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_SOCIAL,
          payload: {
            error: error.response.data
          }
        });
      });
  };
  export const updateSocial = (id, social, addFlashMessage, props) => dispatch => {
    Axios.put(`/api/socials/${id}`, social)
      .then(res => {
        dispatch({
          type: Types.UPDATE_SOCIAL,
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
          type: Types.ERROR_SOCIAL,
          payload: {
            error: error.response.data
          }
        });
        
      });
  };
  
  export const removeSocial = id => dispatch => {
    Axios.delete(`/api/socials/${id}`)
      .then(res => {
        dispatch({
          type: Types.REMOVE_SOCIAL,
          payload: {
            id: res.data._id,
            ...res.data
          }
        });
      })
      .catch(error => {
        dispatch({
          type: Types.ERROR_SOCIAL,
          payload: {
            error: error.response.data
          }
        });
      });
  };
  