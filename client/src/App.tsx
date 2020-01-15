import React from "react";
import "./index.css";
import Pages from "./pages";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { UserProvider } from "./components/context";

export const meQuery = gql`
  query meQuery {
    me {
      id
      lastName
      login
      firstName
      language
      avatar
      email
      language
    }
  }
`;

const App = () => {
  const { data, loading } = useQuery(meQuery);

  if (loading) return <Pages loading={true} />;

  return (
    <UserProvider value={data.me}>
      <Pages />
    </UserProvider>
  );
};

export default App;
