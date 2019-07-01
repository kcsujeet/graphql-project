const {gql} = require('apollo-server')

const typeDefs = gql `

scalar Date

type Query{
    get_post(id:ID!): Post
    get_posts: [Post!]
    get_users: [User!]

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

type User{
    id: ID!
    name: String!
    email: String!
    comments: [Comment!]
    posts: [Post]
    createdAt: Date! 
    updatedAt: Date!
}

type Mutation{
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    add_post(title:String!, description: String!):  Post!
    update_post(title:String!, description: String, id: ID!): Post!
    delete_post(id:ID!): Post!
    add_comment(text:String!, postId: String!):  Comment!
    update_comment(text:String!): Comment!
    delete_comment(id:ID!): Comment!
}

type AuthPayload {
    token: String
    user: User
  }

  type Subscription{
      newPostAdded: Post!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
    user: User!
    createdAt: Date! 
    updatedAt: Date!
  }
  
`

module.exports = typeDefs