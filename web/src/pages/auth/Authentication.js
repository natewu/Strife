import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {TextField, Button} from "@material-ui/core";
import {handleRegister, handleLogin} from "utils/auth.js";
import "styles/Auth.scss";

export const authType = {
   login: true,
   register: false
};

Object.freeze(authType);

export default function Authentication({authType}) {

   const[email, setEmail] = useState(null);
   const[password, setPassword] = useState(null);

   return (
      <div className="wrapper">
         <div className="logo">
            <h2>STRIFE</h2>
         </div>
         <div className="auth-container">
            <h2>Welcome back!</h2>
            <TextField className="input" label="email" type="email" size="small" onChange={e => setEmail(e.target.value)} fullWidth variant="filled" />
            <TextField className="input" label="password" type="password" size="small" onChange={e => setPassword(e.target.value)} fullWidth variant="filled"/>
            { authType ? (<Login email={email} password={password}/>) : (<Register email={email} password={password}/>) }
         </div>
      </div>
   )
}

function Login({email, password}){
   return(
      <div>
         <div className="register input"><Link to="/forgotPass" >Forgot your password?</Link></div>
         <Button className="input" fullWidth onClick={() => handleLogin(email, password)}>Login</Button>
         <span className="register">Need an account? <Link to="/register" >Register</Link> </span>
      </div>
   )
}
function Register({email, password}){

   const[confirmPass, setConfirmPass] = useState(null);

   return(
      <div>
         <TextField className="input" label="confirm password" type="password" size="small" onChange={e => setConfirmPass(e.target.value)} fullWidth variant="filled"/>
         <Button className="input" fullWidth onClick={() => handleRegister(email, password, confirmPass)}>Register</Button>
         <span className="register">Already have an account? <Link to="/login" >Login</Link> </span>
      </div>
   )
}
