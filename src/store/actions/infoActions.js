import Axios from "axios";
import * as Types from "./types";
export const loadInfos = () => dispatch => {
  Axios.get("/api/infos/")
    .then(response => {
      dispatch({
        type: Types.LOAD_INFO,
        payload: {
          erorr: {},
          infos: response.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_INFO,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const creatInfo = (info, addFlashMessage,history) => dispatch => {
  Axios.post("/api/infos/", info)
    .then(res => {
      dispatch({
        type: Types.CREATE_INFO,
        payload: {
          error: {},
          info: res.data
        }
      });
      history.push("/infos");
      addFlashMessage({
        type: "success",
        text: res.data.message
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_INFO,
        payload: {
          error: error.response.data
        }
      });
    });
};

export const updateinfo = (id, info, addFlashMessage, props) => dispatch => {
  Axios.put(`/api/infos/${id}`, info)
    .then(res => {
      dispatch({
        type: Types.UPDATE_INFO,
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
        type: Types.ERROR_INFO,
        payload: {
          error: error.response.data
        }
      });
      
    });
};

export const removeInfo = id => dispatch => {
  Axios.delete(`/api/infos/${id}`)
    .then(res => {
      dispatch({
        type: Types.REMOVE_INFO,
        payload: {
          id: res.data._id,
          ...res.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: Types.ERROR_INFO,
        payload: {
          error: error.response.data
        }
      });
    });
};
