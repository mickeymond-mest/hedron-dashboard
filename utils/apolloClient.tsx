import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/link-context';

import axios from 'axios';

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const response = await axios.get('/api/token');
  const session = response.data;
  const token = session.accessToken;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export default () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true,
    credentials: 'include',
  });
}