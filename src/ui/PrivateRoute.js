import React from 'react';  
import {
    Redirect,
    Route
  } from "react-router-dom";
import DashboardLayout from '../layouts/DashboardLayout';

const PrivateRoute = ({ component: Component, auth , ...rest }) => ( 
   
  <Route {...rest} render={props => (

    auth.isAuthenticated  ? (
      <DashboardLayout>
         <Component {...props}/>
      </DashboardLayout>
    ) : ( 
      <Redirect to={{pathname: '/login', state: { from: props.location }}}/>)
      
      )} />
);

export default PrivateRoute;  
