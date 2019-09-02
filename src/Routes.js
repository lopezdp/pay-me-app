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
import AppliedRoute from "./components/AppliedRoute";
import Register from "./components/UserRegistration";

export default ({childProps}) => <Switch>
                                   { /* This is our home page route for the main landing page tyo the app */ }
                                   <AppliedRoute path="/"
                                     exact
                                     component={ Home }
                                     props={ childProps } />
                                   { /* This is the Login Route */ }
                                   <AppliedRoute path="/signin"
                                     exact
                                     component={ Signin }
                                     props={ childProps } />
                                   { /* This route will catch all unmatched routes && MUST BE LAST!!! */ }

                                   { /* This is the Registration Route */ }
                                   <AppliedRoute path="/register"
                                     exact
                                     component={ Register }
                                     props={ childProps } />
                                   <Route component={ Page404 } />
                                 </Switch>

