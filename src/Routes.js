/*
  Pay Me Now Wallet
  P2P anonymous payments
  Routes.js
*/

import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Page404 from "./containers/404Page";

export default () => <Switch>
                       { /* This is our home page route for the main landing page tyo the app */ }
                       <Route path="/" exact component={ Home } />
                       { /* This is the Login Route */ }
                       <Route path="/login" exact component={ Signin } />
                       { /* This route will catch all unmatched routes && MUST BE LAST!!! */ }
                       <Route component={ Page404 } />
                     </Switch>
