const {gql} = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const urlMovies = 'http://localhost:4001/movies/'
const redis_movies = 'movies:data'

const typeDefs = gql`
  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(_id: String): Movie
  }

  input AddMovie{
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input UpdateMovie{
    _id: String!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input DeleteMovie{
    _id: String!
  }

  extend type Mutation{
    addMovie(data: AddMovie): Movie
    updateMovie(data: UpdateMovie): Movie
    deleteMovie(_id: String!): Message
  }
`

const resolvers = {
  Query: {
    
    movies:async () => {
      try {
        const cache_movies = await redis.get(redis_movies)
        
        if(cache_movies){
          return JSON.parse(cache_movies)
        }

        const {data} = await axios({
          method: 'GET',
          url: urlMovies
        })
        await redis.set(redis_movies,JSON.stringify(data))
        return data
      } catch (error) {
        console.log(error);
      }
    },

    movie:async (_,args) => {
      try {
        const {_id} = args
        const {data} = await axios({
          method: 'GET',
          url: urlMovies+_id
        })
        return data
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    addMovie: async (parents,args,context,info) => {
      try {
        const {data} = args
        const response = await axios({
          url: urlMovies,
          method: 'POST',
          data
        })
        await redis.del(redis_movies)
        return response.data[0]
      } catch (error) {
        console.log(error);
      }
    },
    updateMovie: async (parents,args,context,info) => {
      try {
        const {data} = args
        const id = data._id
        delete data._id
  
        const response = await axios({
          url: urlMovies+id,
          method: 'PUT',
          data
        })
        await redis.del(redis_movies)
        return response.data
      } catch (error) {
        console.log(error);
      }
    },
    deleteMovie: async (parents,args,context,info) => {
      try {
        const id = args._id
  
        const response = await axios({
          url: urlMovies+id,
          method: 'DELETE'
        })
        await redis.del(redis_movies)
        return response.data
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}