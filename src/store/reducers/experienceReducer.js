import * as Types from '../actions/types';

const init ={
    error:{},
    experiences:[]
  
}
const experienceReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_EXPERIENCE: {
            return {
                error:{},
                experiences: action.payload.experiences
            };
        }
        case Types.CREATE_EXPERIENCE: {
            let experiences = [...state]
            experiences.unshift(action.payload.experience)

            return{
                error:{},
                experiences: experiences
            }
        }
        case Types.REMOVE_EXPERIENCE: {

            let experiences = [...state]   ;
            
            experiences = experiences.filter(experience => {
                return experience._id !== action.payload.id
                });

                return{
                    error:{},
                    experiences: action.payload.experiences
                }

        }
        case Types.UPDATE_EXPERIENCE: {
            let experiences = [...state]
            experiences = experiences.map(experience => {
                if (experience._id === action.payload.experience._id) {
                    return action.payload.experiences
                }
                return experience
            })

            return{
                error:{},
                experiences:action.payload.experiences
            }

        }
        case Types.ERROR_EXPERIENCE: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }

}

export default experienceReducer;