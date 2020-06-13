import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../components/login";
/* import Register from "../components/register";
import ForgotPassword from "../components/forgotPassword";
import EmailSent from "../components/emailSent"; */
import Welcome from "../components/welcome";
import Dashboard from "../components/dashboard";
import Place from "../components/dashboard/features/place/Place";
import Profile from "../components/dashboard/features/profile/Profile";
import PhotoPlate from "../components/dashboard/features/photoPlate/PhotoPlate";
import Invoice from "../components/dashboard/features/invoice/Invoices";

const Main = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/dashboard/place/:id" component={Place} />
    <Route exact path="/dashboard/profile" component={Profile} />
    <Route exact path="/dashboard/invoice" component={Invoice} />
    <Route exact path="/dashboard/photo" component={PhotoPlate} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/" component={Welcome} />
  </Switch>
);

export default Main;
