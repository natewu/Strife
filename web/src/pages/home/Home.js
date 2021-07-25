import React, {  } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import "styles/Home.scss";

export default function Home() {
   return (
      <div className="home">
         <div className="launch__app">
            <h1 className="logo">STRIFE</h1>
            <Link to="/app" className="launch__btn">Launch App</Link>
         </div>
      </div>
   )
}
