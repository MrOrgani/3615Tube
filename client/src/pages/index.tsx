import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./homepage/homepage.component";
import SignInSignUpPage from "./sign-in-sign-up/sign-in-sign-up.component";
import ProfilePage from "./profile/profile.component";

export const Pages = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signin" component={SignInSignUpPage} />
      <Route exact path="/profile" component={ProfilePage} />
    </Switch>
  </BrowserRouter>
);

export default Pages;
