import React from 'react'
import app from "api/base.js";

export default function Logout() {
   app.auth().signOut().then(() => {
      console.log("login success");
      }).catch((error) => {
      console.log(error);
   });
   return(null);
}
