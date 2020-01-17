// import ApolloClient from "apollo-boost";

// export const client = new ApolloClient({
//   uri: "http://127.0.0.1:4000",
//   credentials: "include"
// });

import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://127.0.0.1:4000/"
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link
});
