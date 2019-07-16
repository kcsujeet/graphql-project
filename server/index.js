const {ApolloServer} = require('apollo-server')

const typeDefs = require('./schema/schema')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User= require('./resolvers/User')
const Post = require('./resolvers/Post')
const Comment = require('./resolvers/Comment')

require('./config');


const resolvers = {
    Query,
    Mutation,
    User,
    Post,
    Subscription,
    Comment

}
const server = new ApolloServer({
    cors: {
        origin: 'http://localhost:8080',
        credentials: true
    },
    typeDefs,
    resolvers,
    context: ({req, res}) => {
        return {req, res}
      },
})

server.listen().then((url)=>{
    console.log(`🚀  Server running at ${url}`)
})