import gql from 'graphql-tag';

export const typeDefs = gql`

  scalar Date
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Mutation {
    toggleIsLoggedIn(bool_value: Boolean!): Boolean!
  }

  type Post{
    id: ID!
    title: String
    description: String
    created_by: User!
    comments: [Comment!]
    createdAt: Date! 
    updatedAt: Date!
}
`;

export const resolvers = {
  Mutation: {
    toggleIsLoggedIn: (_, args, {cache}) => {
      const currentItem = cache.readQuery({ query: require('./query/clientSide/isLoggedIn.gql') });
      console.log(currentItem, '******************************')
      currentItem.isLoggedIn = args.bool_value
      cache.writeQuery({ query: require('./query/clientSide/isLoggedIn.gql'), data: {isLoggedIn: currentItem.isLoggedIn }});
      return currentItem.isLoggedIn;
    },
  }, 
};