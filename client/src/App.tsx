import React from "react";
import "./index.css";
// import Header from "./components/header/header.component";
// import Footer from "./components/footer/footer.component";
import Pages from "./pages";
import { UserProvider } from "./pages/context";
import { useQuery } from "react-apollo";

import gql from "graphql-tag";

export const meQuery = gql`
  query meQuery {
    me {
      lastName
      login
      firstName
      password
      language
      avatar
      email
    }
  }
`;

//VAL UN VIEUX TEST QUI PEUT SERVIR A SUPPRIMER SI IL GENE TROP
export const findOneQuery = gql`
  query findOneQuery {
    findOne(id: "71c14b08-2d11-4f8c-ba0c-5a2739bdf762") {
      login
      firstName
      language
      password
    }
  }
`;

const App = () => {
  const { data } = useQuery(meQuery);
  // console.log("this is a test to see if the find One query works", useQuery(findOneQuery));
  return (
    <UserProvider value={data ? data.me : null}>
      <Pages />
    </UserProvider>
  );
};

export default App;
