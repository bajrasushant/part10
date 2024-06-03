const { InMemoryCache, ApolloClient } = require("@apollo/client");

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http:192.168.126.143:4000/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
