import * as Types from '../actions/types';

const init ={
    error:{},
    educations:[]
  
}
const educationReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_EDUCATION: {
            return {
                error:{},
                educations: action.payload.educations
            };
        }
        case Types.CREATE_EDUCATION: {
            let educations = [...state]
            educations.unshift(action.payload.education)

            return{
                error:{},
                educations: educations
            }
        }
        case Types.REMOVE_EDUCATION: {

            let educations = [...state]   ;
            
            educations = educations.filter(education => {
                return education._id !== action.payload.id
                });

                return{
                    error:{},
                    educations: action.payload.educations
                }

        }
        case Types.UPDATE_EDUCATION: {
            let educations = [...state]
            educations = educations.map(education => {
                if (education._id === action.payload.education._id) {
                    return action.payload.educations
                }
                return education
            })

            return{
                error:{},
                educations:action.payload.educations
            }

        }
        case Types.ERROR_EDUCATION: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }

}

export default educationReducer;