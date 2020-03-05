import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider} from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';
import * as Types from "./store/actions/types";
import setAuthToken from './ui/setAuthtoken'
const token  = localStorage.getItem('auth_token');

if(token){
    let decode = jwtDecode(token);
    setAuthToken(token)
    store.dispatch({
        type:Types.SET_USER,
        payload:{
            user:decode
        }
    })
}
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// Check if hot reloading is enable. If it is, changes won't reload the page.
// This is related to webpack-dev-server and works on development only.
if (module.hot) {
    module.hot.accept();
  }