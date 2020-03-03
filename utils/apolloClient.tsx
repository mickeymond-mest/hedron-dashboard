import { ApolloClient, HttpLink, InMemoryCache, from, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';
// import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const response = await fetch(`${process.env.POST_LOGOUT_REDIRECT_URI}/api/token`);
  const session = await response.json();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: session ? `Bearer ${session.accessToken}` : "",
    }
  }
});

// const uploadLink = createUploadLink({ uri: process.env.GRAPHQL_ENDPOINT });

export default () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      authLink,
      // (uploadLink as unknown as ApolloLink),
      new HttpLink({ uri: process.env.GRAPHQL_ENDPOINT })
    ]),
    ssrMode: true,
  });
}