import * as Types from '../actions/types';

const init ={
    error:{},
    infos:[]
  
}
const infoReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_INFO: {
            return {
                error:{},
                infos: action.payload.infos
            };
        }
        case Types.CREATE_INFO: {
            let infos = [...state]
            infos.unshift(action.payload.info)

            return{
                error:{},
                infos: infos
            }
        }
        case Types.REMOVE_INFO: {

            let infos = [...state]   ;
            
            infos = infos.filter(info => {
                return info._id !== action.payload.id
                });

                return{
                    error:{},
                    infos: action.payload.infos
                }

        }
        case Types.UPDATE_INFO: {
            let infos = [...state]
            infos = infos.map(info => {
                if (info._id === action.payload.info._id) {
                    return action.payload.infos
                }
                return info
            })

            return{
                error:{},
                infos:action.payload.infos
            }

        }
        case Types.ERROR_INFO: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }

}

export default infoReducer;