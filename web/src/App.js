import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";

import Home from "./components/home/Home.js";
import './App.scss';

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/">
               <div className="App">
                  <header className="App-header">
                     Strife
                  </header>
                  <Home/>
               </div>
            </Route>
            <Route path="/app" />
            <Route path="/logout"/>
            <Route path="*">
               404 Not Found
            </Route>
         </Switch>
      </Router>
   );
}

export default App;
