import Axios from 'axios';
import * as Types from './types';


export const loadUsers = () => dispatch => {
    Axios.get('/api/users/')
    .then(response => {

        dispatch({
            type: Types.LOAD_USER,
            payload: {
                error:{},
                users: response.data
            }
        })
    })
    .catch(error => {
        dispatch({
            type: Types.USERS_ERROR,
            payload: {
                error:{}
            }
        })
    })
}