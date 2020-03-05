import * as Types from '../actions/types';


const init ={
    error:{},
    abouts:[]
}
const aboutReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_ABOUT: {
            return {
                error:{},
                abouts: action.payload.abouts
            };
        }
        case Types.CREATE_ABOUT: {
            let abouts = [...state]
            abouts.unshift(action.payload.about)
            return{
                error:{},
                abouts: abouts  
            }
        }
        case Types.UPDATE_ABOUT: {
            let abouts = [...state]
            abouts = abouts.map(about => {
                if (about._id === action.payload.about._id) {
                    return action.payload.abouts
                }
                return about;
            })

            return{
                error:{},
                abouts:action.payload.abouts
            }

        }

        case Types.REMOVE_ABOUT: {

            let abouts = [...state]   ;
            
                abouts = abouts.filter(about => {
                return about._id !== action.payload.id
                });

                return{
                    error:{},
                    abouts: action.payload.abouts
                }

        }
        case Types.ERROR_ABOUT: {
            return {
                ...state,
                error: action.payload.error
            }
        }
    default: return state;
    }

}

export default aboutReducer;