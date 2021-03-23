const {ApolloServer, makeExecutableSchema} = require('apollo-server')
const serieSchema = require('./schemes/serieSchema')
const movieSchema = require('./schemes/movieSchema')
const entertainmeSchema = require('./schemes/entertainmeSchema')

const typeDefs = `
  type Query
  type Mutation
`
const schema = makeExecutableSchema({
  typeDefs: [typeDefs, serieSchema.typeDefs, entertainmeSchema.typeDefs, movieSchema.typeDefs],
  resolvers: [serieSchema.resolvers, entertainmeSchema.resolvers, movieSchema.resolvers]
})

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});