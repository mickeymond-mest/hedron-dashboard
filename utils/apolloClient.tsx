import ApolloClient from 'apollo-boost';

export default () => {
  return new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    request: async (operation) => {
      // get the authentication token from local storage if it exists
      const response = await fetch(`${process.env.POST_LOGOUT_REDIRECT_URI}/api/token`);
      const session = await response.json();
      // return the headers to the context so httpLink can read them
      operation.setContext({
        headers: {
          authorization: session ? `Bearer ${session.accessToken}` : "",
        }
      })
    }
  });
}