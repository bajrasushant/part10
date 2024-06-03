const { InMemoryCache, ApolloClient } = require("@apollo/client");
import Constants from "expo-constants";

const createApolloClient = () => {
  return new ApolloClient({
    uri: Constants.expoConfig.extra.apollo_uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
