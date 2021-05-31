import React from 'react'
import app, {db} from "api/base.js";

export default function App() {
   return (
      <div style={{color:"black"}}>
         App:
         {app.auth().currentUser.email}
      </div>
   )
}
