import * as Types from '../actions/types';

const init ={
    error:{},
    socials:[]
}
const socialReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_SOCIAL: {
            return {
                error:{},
                socials: action.payload.socials
            };
        }
        case Types.CREATE_SOCIAL: {
            let socials = [...state]
            socials.unshift(action.payload.social)

            return{
                error:{},
                socials: socials
            }
        }
        case Types.REMOVE_SOCIAL: {

            let socials = [...state]   ;
            
                socials = socials.filter(social => {
                return social._id !== action.payload.id
                });

                return{
                    error:{},
                    socials: action.payload.socials
                }

        }
        case Types.UPDATE_SOCIAL: {
            let socials = [...state]
            socials = socials.map(social => {
                if (social._id === action.payload.social._id) {
                    return action.payload.socials
                }
                return social;
            })

            return{
                error:{},
                socials:action.payload.socials
            }

        }
        case Types.ERROR_SOCIAL: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }

}

export default socialReducer;