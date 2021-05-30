import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({component: Component, authenticated, params, ...rest}){
   return(
      <Route
         {...rest}
         render={
            (props) => authenticated === true
            ? <Component {...params} {...props}/> 
            : <Redirect to={{ pathname:"/login", state:{ from: props.location } }}/> 
         }
      />
   );
}

export function PublicRoute({component: Component, authenticated, params, ...rest}){
   return(
      <Route
         {...rest}
         render={
            (props) => authenticated === false
            ? <Component {...params} {...props}/>
            : <Redirect to={{ pathname:"/app" }}/>
         }
      />
   );
}
