const {ApolloServer, gql, makeExecutableSchema} = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  type Serie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  type Query {
    movies: [Movie]
    series: [Serie]
    movie(_id: String): Movie
    serie(_id: String): Serie
  }

  input AddMovie{
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  input UpdateMovie{
    _id: String!
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  input DeleteMovie{
    _id: String!
  }

  input AddSerie{
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  input UpdateSerie{
    _id: String!
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  input DeleteSerie{
    _id: String!
  }

  type Message{
    message: String
  }

  type Mutation{
    addMovie(data: AddMovie): Movie
    updateMovie(data: UpdateMovie): Movie
    deleteMovie(_id: String): Message

    addSerie(data: AddSerie): Serie
    updateSerie(data: UpdateSerie): Serie
    deleteSerie(_id: String): Message
  }
`
const urlMovies = 'http://localhost:4001/movies/'
const urlSeries = 'http://localhost:4002/series/'
const redis_series = 'series:data'
const redis_movies = 'movies:data'

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

    series:async () => {
      try {
        const cache_series = await redis.get(redis_series)
        
        if(cache_series){
          return JSON.parse(cache_series)
        }

        const {data} = await axios({
          method: 'GET',
          url: urlSeries
        })
        await redis.set(redis_series,JSON.stringify(data))
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
    },

    serie:async (_,args) => {
      try {
        const {_id} = args
        const {data} = await axios({
          method: 'GET',
          url: urlSeries+_id
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
        console.log(response.data);
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
    },
    addSerie: async (parents,args,context,info) => {
      try {
        const {data} = args
        console.log(data);
        const response = await axios({
          url: urlSeries,
          method: 'POST',
          data
        })
        await redis.del(redis_series)
        return response.data[0]
      } catch (error) {
        console.log(error);
      }
    },
    updateSerie: async (parents,args,context,info) => {
      try {
        const {data} = args
        const id = data._id
        delete data._id
  
        const response = await axios({
          url: urlSeries+id,
          method: 'PUT',
          data
        })
        await redis.del(redis_series)
        return response.data
      } catch (error) {
        console.log(error);
      }
    },

    deleteSerie: async (parents,args,context,info) => {
      try {
        const id = args._id
        console.log(id);
        const response = await axios({
          url: urlSeries+id,
          method: 'DELETE'
        })
        await redis.del(redis_series)
        // console.log(response.data);
        return response.data
      } catch (error) {
        console.log(error);
      }
    }
  }

}

const server = new ApolloServer({typeDefs,resolvers})
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});