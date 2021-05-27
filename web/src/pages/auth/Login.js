import React, {useCallback} from 'react'
import {TextField, Button} from "@material-ui/core";
import app from "api/base.js";

export default function Login() {

   const handleLogin = useCallback(
      async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
        } catch (error) {
          alert(error);
        // incorrectMessage="Incorrect Password!";
        }
      },
    );

   return (
      <div id="login-container">
         <TextField label="email" type="email" name="email" size="small" fullWidth variant="outlined"/>
         <TextField label="password" type="password" name="password" size="small" fullWidth variant="outlined"/>
         <Button fullWidth>Login</Button>
      </div>
   )
}
