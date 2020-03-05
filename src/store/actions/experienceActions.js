import Axios from "axios";
import * as Types from "./types";
export const loadExperience = () => dispatch => {
  Axios.get("/api/experience/")
    .then(response => {
      dispatch({
        type: Types.LOAD_EXPERIENCE,
        payload: {
          erorr: {},
          experiences: response.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_EXPERIENCE,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const creatExperience = (experience, addFlashMessage, history) => dispatch => {
  Axios.post("/api/experience/", experience)
    .then(res => {
      dispatch({
        type: Types.CREATE_EXPERIENCE,
        payload: {
          error: {},
          experience: res.data
        }
      });
      history.push("/experiences");
      addFlashMessage({
        type: "success",
        text: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_EXPERIENCE,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const updateExperience = (id, experience, addFlashMessage, props) => dispatch => {
  Axios.put(`/api/experience/${id}`, experience)
    .then(res => {
      dispatch({
        type: Types.UPDATE_EXPERIENCE,
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
        type: Types.ERROR_EXPERIENCE,
        payload: {
          error: error.response.data
        }
      });
      
    });
};

export const removeExperience = id => dispatch => {
  Axios.delete(`/api/experience/${id}`)
    .then(res => {
      dispatch({
        type: Types.REMOVE_EXPERIENCE,
        payload: {
          id: res.data._id,
          ...res.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_EXPERIENCE,
        payload: {
          error: error.response.data
        }
      });
    });
};
