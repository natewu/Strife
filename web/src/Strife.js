import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "api/base.js";
import { PublicRoute, PrivateRoute } from "components/Routing.js";
// import { TextField, InputAdornment } from "@material-ui/core";

import Home from "pages/home/Home.js";
import App from "pages/app/App.js";
import Authentication, {authType} from "pages/auth/Authentication.js";
import Logout from "pages/auth/Logout.js";
import './Strife.scss';

import { useSelector, useDispatch } from "react-redux";
import { login, selectUser, logout } from "redux/reducers/userSlice.js";

/* export default class Strife extends React.Component{
   constructor(props){
      super(props);

      this.state = {
         Auth: false,
         loading: true
      }; 
   }

   componentDidMount(){
      auth.onAuthStateChanged((user) => {
         if(user){
            this.setState({
               Auth: true,
               loading: false
            })
         }
         else{
            this.setState({
               Auth: false,
               loading: false
            })
         }
      });
   };

   render(){
      return this.state.loading  === true ? <h2>loading... </h2> : ( //add loading
         <Router>
            <Switch>
               <Route exact path="/" component={Home}/>
               <PrivateRoute path="/app" authenticated={this.state.Auth} component={App}/>
               <PublicRoute path="/Login" authenticated={this.state.Auth} component={Authentication} params={{authType: true}}/>
               <PublicRoute path="/Register" authenticated={this.state.Auth} component={Authentication} params={{authType: authType.register}}/>
               <PrivateRoute path="/Logout" authenticated={this.state.Auth} component={Logout}/>
               <Route path="*">
                  <p>404 Not Found</p>
               </Route>
            </Switch>
         </Router>
      );
   }
} */

export default function Strife() {
   // const [Auth, setAuth] = useState(null);
   const [loading, setLoading] = useState(true);

   const dispatch = useDispatch();

   // useEffect(() => {
   //    console.log("Running auth");
   //    const checkAuth = () => {
   //       auth().onAuthStateChanged((user) => {
   //          if(user){
   //             setAuth(true);
   //             setLoading(false);
   //             console.log("success");
   //          }
   //          else{
   //             setAuth(false);
   //             setLoading(false);
   //             console.log("fail");
   //          }
   //       });
   //    }
   //    console.log("done");
   //    return checkAuth;
   // });

   useEffect(()=>{
      auth.onAuthStateChanged((authUser) => {
         if(authUser){
            dispatch(login({
               auth: true,
               uid: authUser.uid,
               photo: authUser.photoURL,
               email: authUser.email,
               username: authUser.displayName,
            }));
            setLoading(false);
         }
         else{
            dispatch(logout());
            setLoading(false);
         }
      })
   }, [dispatch]);

   const user = useSelector(selectUser);

   return loading  === true ? <h2>loading... </h2> : ( //add loading
      <Router>
         <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/app" authenticated={user} component={App}/>
            <PublicRoute path="/Login" authenticated={user} component={Authentication} params={{authType: true}}/>
            <PublicRoute path="/Register" authenticated={user} component={Authentication} params={{authType: authType.register}}/>
            <PrivateRoute path="/Logout" authenticated={user} component={Logout}/>
            <Route path="*">
               <p>404 Not Found</p>
            </Route>
            
         </Switch>
      </Router>
   );
}