import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./homepage/homepage.component";
import AuthRoute from "../controller/Auth/AuthRoute";
import TextPage from "../components/textpage/textpage";
import LogoutConnector from "../components/Logout/LogoutConnector";
import Header from "../components/header/header.component";
import Footer from "../components/footer/footer.component";
import RegisterConnector from "../components/register/RegisterConnnector";
import LoginConnector from "../components/login/LoginConnector";
import ConfirmAccountConnector from "../components/ConfirmAccount/ConfirmAccountConnector";
import ChangePasswordConnector from "../components/ChangePassword/ChangePasswordConnector";
import UserProfileConnector from "../components/user-profile/UserProfileConnector";
import MovieListConnector from "../components/MovieList/MovieListConnector";
import MovieOneConnector from "../components/MovieOne/MovieOneConnector";
import ForgotPasswordConnector from "../components/ForgotPassword/ForgotPasswordConnector";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./index.scss";

interface Props {
  loading?: boolean;
}

export const Pages = ({ loading }: Props) => (
  <BrowserRouter>
    <Header />
    <div className="App">
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size="20vh" variant="indeterminate" />
        </div>
      )}
      {!loading && (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={RegisterConnector} />
          <Route path="/login" component={LoginConnector} />
          <Route path="/m" component={TextPage} />
          <AuthRoute path="/logout" component={LogoutConnector} />
          <Route path="/confirm/:token" component={ConfirmAccountConnector} />
          <Route path="/forgot-password" component={ForgotPasswordConnector} />
          <Route path="/reset/:key" component={ChangePasswordConnector} />
          <AuthRoute exact path="/profile" component={UserProfileConnector} />
          <AuthRoute
            exact
            path="/profile/:userId"
            component={UserProfileConnector}
          />
          <AuthRoute exact path="/movies" component={MovieListConnector} />
          <AuthRoute
            exact
            path="/movie/:imdbId"
            component={MovieOneConnector}
          />
        </Switch>
      )}
    </div>
    <Footer />
  </BrowserRouter>
);

export default Pages;
