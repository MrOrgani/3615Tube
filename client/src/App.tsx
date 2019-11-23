import React from "react";
import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import history from "./../src/utils/history";

const App: React.FC = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/signin" component={SignInSignUpPage} />
          {/* <Route exact path="/profile" component={MyProfile} /> */}
          {/* <Route exact path="/profile" component={MyProfile} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
