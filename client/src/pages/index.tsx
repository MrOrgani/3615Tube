import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./homepage/homepage.component";
import SignInSignUpPage from "./sign-in-sign-up/sign-in-sign-up.component";
import ProfilePage from "./profile/profile.component";
import ForgotPasswordPage from "./forgot-password/ForgotPasswordPage";
import ChangePasswordPage from "./change-password/ChangePasswordPage";


export const Pages = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signin" component={SignInSignUpPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/change-password/:key" component={ChangePasswordPage} />
      <Route exact path="/profile" component={ProfilePage} />
      {/* <Route exact path="/profile/:key" component={ProfilePage} /> */}
    </Switch>
  </BrowserRouter>
);

export default Pages;
