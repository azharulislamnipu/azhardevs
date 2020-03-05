import * as Types from '../actions/types';


const init ={
    error:{},
    cvs:[]
}
const cvReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_CV: {
            return {
                error:{},
                cvs: action.payload.cvs
            };
        }
        case Types.CREATE_CV: {
            // let cvs = [...state]
            // cvs.unshift(action.payload.cvs)
            return{
                error:{},
                cvs: action.payload.cvs
            }
        }
        case Types.UPDATE_CV: {
            let cvs = [...state]
            cvs = cvs.map(cv => {
                if (cv._id === action.payload.cv._id) {
                    return action.payload.cvs
                }
                return cv;
            })

            return{
                error:{},
                cvs:action.payload.cvs
            }

        }

        case Types.REMOVE_CV: {

            let cvs = [...state]   ;
            
            cvs = cvs.filter(cv => {
                return cv._id !== action.payload.id
                });

                return{
                    error:{},
                    cvs: action.payload.cvs
                }

        }
        case Types.ERROR_CV: {
            return {
                ...state,
                error: action.payload.error
            }
        }
    default: return state;
    }

}

export default cvReducer;