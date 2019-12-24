import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./homepage/homepage.component";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import ProfilePage from "./profile/ProfilePage";
import ForgotPasswordPage from "./forgot-password/ForgotPasswordPage";
import ChangePasswordPage from "./change-password/ChangePasswordPage";
import ConfirmAccountPage from "./confirm/ConfirmAccountPage";
import "./index.scss";
import AuthRoute from "../controller/Auth/AuthRoute";
import TextPage from "./textpage/textpage";
import LogoutConnector from "../components/Logout/LogoutConnector";

export const Pages = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/m" component={TextPage} />
        <Route path="/logout" component={LogoutConnector} />
        <Route path="/confirm/:token" component={ConfirmAccountPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/change-password/:key" component={ChangePasswordPage} />
        <AuthRoute exact path="/profile/:key" component={ProfilePage} />
        <AuthRoute exact path="/profile" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Pages;
