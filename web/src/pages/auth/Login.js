import React, {useState} from 'react'
import {TextField, Button} from "@material-ui/core";
import {handleSignup, handleLogin} from "utils/auth.js";

export default function Login() {

  const[email, setEmail] = useState(null);
  const[password, setPassword] = useState(null);

  return (
    <div id="auth-container">
        <TextField label="email" type="email" size="small" onChange={e => setEmail(e.target.value)} fullWidth variant="outlined"/>
        <TextField label="password" type="password" size="small" onChange={e => setPassword(e.target.value)} fullWidth variant="outlined"/>
        <Button fullWidth onClick={() => handleLogin(email, password)}>Login</Button>
        <Button fullWidth onClick={() => handleSignup(email, password)}>Signup</Button>
    </div>
  )
}
