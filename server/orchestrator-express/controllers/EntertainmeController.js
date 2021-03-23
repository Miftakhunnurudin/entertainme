const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')
const redis_movies = 'movies:data'
const redis_series = 'series:data'
const urlMovies = 'http://localhost:4001/movies/'
const urlSeries = 'http://localhost:4002/series/'

class EntertainmeController {
  static async get (req,res,next){
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

      res.status(200).json({movies, series})

    } catch (error) {
      next(error)
    }
  }
}

module.exports = EntertainmeController
