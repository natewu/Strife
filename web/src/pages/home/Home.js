import React, {  } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Home() {
   return (
      <div>
         Home - 
         <Link to="/app">Launch app</Link>
      </div>
   )
}
