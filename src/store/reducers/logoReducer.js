import * as Types from '../actions/types';


const init ={
    error:{},
    logos:[]
}
const logoReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_LOGO: {
            return {
                error:{},
                logos: action.payload.logos
            };
        }
        case Types.CREATE_LOGO: {
            //  let logos = [...state]
            //  logos.unshift(action.payload.logos)
            return{
                error:{},
                logos: action.payload.logos
            }
        }
        case Types.UPDATE_LOGO: {
            let logos = [...state]
            logos = logos.map(logo => {
                if (logo._id === action.payload.logo._id) {
                    return action.payload.logos
                }
                return logo;
            })

            return{
                error:{},
                logos:action.payload.logos
            }

        }

        case Types.REMOVE_LOGO: {

            let logos = [...state]   ;
            
            logos = logos.filter(logo => {
                return logo._id !== action.payload.id
                });

                return{
                    error:{},
                    logos: action.payload.logos
                }

        }
        case Types.ERROR_LOGO: {
            return {
                ...state,
                error: action.payload.error
            }
        }
    default: return state;
    }

}

export default logoReducer;