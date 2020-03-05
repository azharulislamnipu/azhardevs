import * as Types from '../actions/types';

const init ={
    error:{},
    services:[]
  
}
const serviceReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_SERVICE: {
            return {
                error:{},
                services: action.payload.services
            };
        }
        case Types.CREATE_SERVICE: {
            let services = [...state]
            services.unshift(action.payload.service)

            return{
                error:{},
                services: services
            }
        }
        case Types.REMOVE_SERVICE: {

            let services = [...state]   ;
            
            services = services.filter(service => {
                return service._id !== action.payload.id
                });

                return{
                    error:{},
                    services: action.payload.services
                }

        }
        case Types.UPDATE_SERVICE: {
            let services = [...state]
            services = services.map(service => {
                if (service._id === action.payload.info._id) {
                    return action.payload.service
                }
                return service
            })

            return{
                error:{},
                services:action.payload.services
            }

        }
        case Types.ERROR_SERVICE: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }

}

export default serviceReducer;