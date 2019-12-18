import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import dotenv from "dotenv";
import { ApolloProvider } from "react-apollo";
import { client } from "./apollo";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Pages from "./pages";

dotenv.config();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Header />
    <Pages />
    <Footer />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
