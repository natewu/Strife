import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";

export default function Home() {
   return (
      <div>
         Home - 
         <Link to="/app">Launch app</Link>
      </div>
   )
}
