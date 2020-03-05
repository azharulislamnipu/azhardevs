import Axios from "axios";
import * as Types from "./types";
export const loadService = () => dispatch => {
  Axios.get("/api/services/")
    .then(response => {
      dispatch({
        type: Types.LOAD_SERVICE,
        payload: {
          erorr: {},
          services: response.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_SERVICE,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const creatService = (service, addFlashMessage,history) => dispatch => {
  Axios.post("/api/services/", service)
    .then(res => {
      dispatch({
        type: Types.CREATE_SERVICE,
        payload: {
          error: {},
          service: res.data
        }
      });
      history.push("/services");
      addFlashMessage({
        type: "success",
        text: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_SERVICE,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const updateService = (id, service, addFlashMessage, props) => dispatch => {
  Axios.put(`/api/services/${id}`, service)
    .then(res => {
      dispatch({
        type: Types.UPDATE_SERVICE,
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
        type: Types.ERROR_SERVICE,
        payload: {
          error: error.response.data
        }
      });
      
    });
};

export const removeService = id => dispatch => {
  Axios.delete(`/api/services/${id}`)
    .then(res => {
      dispatch({
        type: Types.REMOVE_SERVICE,
        payload: {
          id: res.data._id,
          ...res.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_SERVICE,
        payload: {
          error: error.response.data
        }
      });
    });
};
