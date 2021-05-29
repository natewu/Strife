import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {TextField, Button} from "@material-ui/core";
import {handleSignup, handleLogin} from "utils/auth.js";
import "styles/Auth.scss";

export default function Login() {

  const[email, setEmail] = useState(null);
  const[password, setPassword] = useState(null);

  return (
    <div className="wrapper">
      <div className="logo">
        <h2>Strife</h2>
      </div>
      <div className="auth-container">
        <h2>Welcome back!</h2>
        <TextField className="input" label="email" type="email" size="small" onChange={e => setEmail(e.target.value)} fullWidth variant="filled" />
        <TextField className="input" label="password" type="password" size="small" onChange={e => setPassword(e.target.value)} fullWidth variant="filled"/>
        <span className="register input"><Link to="/signup" >Forgot your password?</Link> </span>
        <Button className="input" fullWidth onClick={() => handleLogin(email, password)}>Login</Button>
        {/* <Button className="input" fullWidth onClick={() => handleSignup(email, password)}>Signup</Button> */}
        <span className="register">Need an account? <Link to="/signup" >Register</Link> </span>
      </div>
      
    </div>
  )
}
