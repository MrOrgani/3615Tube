import React from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signin" component={SignInSignUpPage} />
      </Switch>
    </div>
  );
};

export default App;
