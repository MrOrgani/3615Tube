import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: "http://127.0.0.1:4000",
  credentials: "include"
});
