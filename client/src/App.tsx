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
    }
  }
`;

const App = () => {
  const { data } = useQuery(meQuery);

  return (
    <UserProvider value={data ? data.me : null}>
      <Pages />
    </UserProvider>
  );
};

export default App;
