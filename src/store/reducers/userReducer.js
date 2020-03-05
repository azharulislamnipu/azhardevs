import * as Types from "../actions/types";

const init = {
  users: {}, 
  error: {}
};

const authReducer = (state = init, action) => {
  switch (action.type) {
 
    case Types.LOAD_USER: {
      return {
        error: {},
        users: action.payload.users
      };
    }
    case Types.USERS_ERROR: {
      return {
        ...state,
        error: action.payload.error
      };
    }
    default:
      return state;
  }
};

export default authReducer;
