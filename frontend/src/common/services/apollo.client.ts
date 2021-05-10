import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri:
    process.env.REACT_APP_GRAPHQL_ENDPOINT ||
    "http://localhost:5000/api/graphql",
  cache: new InMemoryCache(),
});
