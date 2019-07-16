import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from "vue-apollo"
import { resolvers, typeDefs } from './resolvers';

// HTTP connexion to the API
const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:4000',
    headers:{
     
    },
    credentials: 'include'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    typeDefs,
    resolvers,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

cache.writeData({
    data: {
      isLoggedIn: !!localStorage.getItem('isLoggedIn'),
    },
  });

export default apolloProvider