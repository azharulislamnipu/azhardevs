import Axios from "axios";
import * as Types from "./types";
export const loadEducation = () => dispatch => {
  Axios.get("/api/educations/")
    .then(response => {
      dispatch({
        type: Types.LOAD_EDUCATION,
        payload: {
          erorr: {},
          educations: response.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_EDUCATION,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const createEducation = (educations, addFlashMessage, history) => dispatch => {
  Axios.post("/api/educations/", educations)
    .then(res => {
      dispatch({
        type: Types.CREATE_EDUCATION,
        payload: {
          error: {},
          education: res.data
        }
      });
      history.push("/educations");
      addFlashMessage({
        type: "success",
        text: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_EDUCATION,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const updateEducation = (id, educations, addFlashMessage, props) => dispatch => {
  Axios.put(`/api/educations/${id}`, educations)
    .then(res => {
      dispatch({
        type: Types.UPDATE_EDUCATION,
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
        type: Types.ERROR_EDUCATION,
        payload: {
          error: error.response.data
        }
      });
      
    });
};

export const removeEducation = id => dispatch => {
  Axios.delete(`/api/educations/${id}`)
    .then(res => {
      dispatch({
        type: Types.REMOVE_EDUCATION,
        payload: {
          id: res.data._id,
          ...res.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_EDUCATION,
        payload: {
          error: error.response.data
        }
      });
    });
};
