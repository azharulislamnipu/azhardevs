import * as Types from '../actions/types';


const init ={
    error:{},
    portfolios:[]
}
const portfolioReducer = (state = init, action) => {
    switch(action.type){
        case Types.LOAD_PORTFOLIO: {
            return {
                error:{},
                portfolios: action.payload.portfolios
            };
        }
        case Types.CREATE_PORTFOLIO: {
            let portfolios = [...state]
            portfolios.unshift(action.payload.portfolio)
            return{
                error:{},
                portfolios: portfolios  
            }
        }
        case Types.UPDATE_PORTFOLIO: {
            let portfolios = [...state]
            portfolios = portfolios.map(portfolio => {
                if (portfolio._id === action.payload.portfolio._id) {
                    return action.payload.portfolios
                }
                return portfolio;
            })

            return{
                error:{},
                portfolios:action.payload.portfolios
            }

        }

        case Types.REMOVE_PORTFOLIO: {

            let portfolios = [...state]   ;
            
                portfolios = portfolios.filter(portfolio => {
                return portfolio._id !== action.payload.id
                });

                return{
                    error:{},
                    portfolios: action.payload.portfolios
                }

        }
        case Types.ERROR_PORTFOLIO: {
            return {
                ...state,
                error: action.payload.error
            }
        }
    default: return state;
    }

}

export default portfolioReducer;