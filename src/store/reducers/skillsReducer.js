import * as Types from '../actions/types';


const init ={
    error:{},
    skills:[]
}
const skillsReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_SKILLS: {
            return {
                error:{},
                skills: action.payload.skills
            };
        }
        case Types.CREATE_SKILLS: {
            let skills = [...state]
            skills.unshift(action.payload.skill)
            return{
                error:{},
                skills: skills  
            }
        }
        case Types.UPDATE_SKILLS: {
            let skills = [...state]
            skills = skills.map(skill => {
                if (skill._id === action.payload.skill._id) {
                    return action.payload.skills
                }
                return skill;
            })

            return{
                error:{},
                skills:action.payload.skills
            }

        }

        case Types.REMOVE_SKILLS: {

            let skills = [...state]   ;
            
            skills = skills.filter(skill => {
                return skill._id !== action.payload.id
                });
                return{
                    error:{},
                    skills: action.payload.skills
                }
        }
        case Types.ERROR_SKILLS: {
            return {
                ...state,
                error: action.payload.error
            }
        }
    default: return state;
    }

}

export default skillsReducer;