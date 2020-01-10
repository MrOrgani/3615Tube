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
      language
      avatar
      email
    }
  }
`;

const App = () => {
  const { data } = useQuery(meQuery);
  console.log("this is a test to see if the find One query works", data);

  return (
    <UserProvider value={data ? data.me : null}>
      <Pages />
    </UserProvider>
  );
};

export default App;
