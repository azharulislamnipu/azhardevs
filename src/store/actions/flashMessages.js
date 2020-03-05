import * as Types from './types';

export function addFlashMessage(message) {
    return {
      type: Types.ADD_FLASH_MESSAGE,
      message
    }
  }

  export function addflashmessage(message) {
    return {
      type: Types.ADD_FLASH_MESSAGE,
      message
    }
  }
  
  export function deleteFlashMessage(id) {
    return {
      type: Types.DELETE_FLASH_MESSAGE,
      id
    }
  }