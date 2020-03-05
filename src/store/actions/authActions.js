import Axios from 'axios';
import * as Types from './types';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../ui/setAuthtoken'

//regiser
export const register = (user, history,addFlashMessage) => dispatch => {
  Axios.post('/api/users/register', user)
      .then((res) => {
          dispatch({
              type: Types.USERS_ERROR,
              payload: {
                  error: {}
              }
          });
          history.push('/login');
          addFlashMessage({
            type: 'success',
            text: res.data.message
          });

      })
      .catch(error => {
          dispatch({
              type: Types.USERS_ERROR,
              payload: {
                  error: error.response.data
              }
          })
      })
}


//login
export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then((res) => {
            //token decode
            //save token our local storage
            // set auth header
            //dispatch set user

            let token = res.data.token
            localStorage.setItem('auth_token', token)
            setAuthToken(token)
            let decode = jwtDecode(token);
   

            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode
                }
            });

            if(decode.role == "admin"){
                history.replace('/dashboard');
            }else{
                history.replace('/account');
            }
  

        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
  }


//logout

export const logout = history =>{

    localStorage.removeItem('auth_token');
    history.push('/login');
    return{
        type:Types.SET_USER,
        payload:{
            user: {}
        }

    }

}