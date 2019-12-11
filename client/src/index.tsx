import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "./react-auth0-spa";
// import config from "./auth_config.json.js";
// import history from "./utils/history";
import dotenv from "dotenv";
import { ApolloProvider } from "react-apollo";
import { client } from "./apollo";

dotenv.config();

// const onRedirectCallback: any = appState => {
//   history.push(
//     appState && appState.targetUrl
//       ? appState.targetUrl
//       : window.location.pathname
//   );
// };

ReactDOM.render(
  // <Auth0Provider
  //   domain={config.domain}
  //   client_id={config.clientId}
  //   redirect_uri={window.location.origin}
  //   onRedirectCallback={onRedirectCallback}
  // >
  <ApolloProvider client={client}>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </ApolloProvider>,
  // </Auth0Provider>
  document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
