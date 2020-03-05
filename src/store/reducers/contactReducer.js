import * as Types from '../actions/types';

const init ={
    error:{},
    contacts:[]
  
}
const contactReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_CONTACT: {
            return {
                error:{},
                contacts: action.payload.contacts
            };
        }
        case Types.CREATE_CONTACT: {
            let contacts = [...state]
            contacts.unshift(action.payload.contact)

            return{
                error:{},
                contacts: contacts
            }
        }
        case Types.REMOVE_CONTACT: {

            let contacts = [...state]   ;
            
             contacts = contacts.filter(contact => {
                return contact._id !== action.payload.id
                });

                return{
                    error:{},
                    contacts: action.payload.contacts
                }

        }
        case Types.UPDATE_CONTACT: {
            let contacts = [...state]
            contacts = contacts.map(contact => {
                if (contact._id === action.payload.contact._id) {
                    return action.payload.contacts
                }
                return contact
            })

            return{
                error:{},
                contacts:action.payload.contacts
            }

        }

        case Types.ERROR_CONTACT: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }

}

export default contactReducer;