import * as Types from '../actions/types';
import shortid from 'short-id';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch(action.type) {
    case Types.ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case Types.DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;

    default: return state;
  }
}