const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`

  type Entertainme {
    movies: [Movie]
    series: [Serie]
  }
  extend type Query {
    entertainme: Entertainme
  }
`
const urlMovies = 'http://localhost:4001/movies/'
const urlSeries = 'http://localhost:4002/series/'
const redis_series = 'series:data'
const redis_movies = 'movies:data'

const resolvers = {
  Query: {
    
    entertainme:async () => {
      try {
        const cacheMovies = await redis.get(redis_movies)
        const cacheSeries = await redis.get(redis_series)
  
        let movies = JSON.parse(cacheMovies)
        let series = JSON.parse(cacheSeries)
        
        if (!cacheMovies){
          const responseMovies = await axios({
            url:urlMovies,
            method: 'GET'
          })
          movies = responseMovies.data
          await redis.set(redis_movies, JSON.stringify(movies))
        }
  
        if (!cacheSeries){
          const responseSeries = await axios({
            url:urlSeries,
            method: 'GET'
          })
          series = responseSeries.data
          await redis.set(redis_series, JSON.stringify(series))
        }
  
        return {movies,series}
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