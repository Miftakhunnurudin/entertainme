const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')
const url = 'http://localhost:4001/movies/'
const redis_movies = 'movies:data'

class MovieController {
  static async getAll (req,res,next){
    try {
      const movies = await redis.get(redis_movies)

      if(movies){
        return res.status(200).json(JSON.parse(movies))
      }else{
        const {data} = await axios({
          url,
          method: 'GET'
        })
        redis.set(redis_movies, JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async getOne (req,res,next){
    try {
      const {id} = req.params

      const {data} = await axios({
        url: url+id,
        method: 'GET'
      })
      if(data){
        res.status(200).json(data)
      }else{
        next({name: 'NotFound'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async create (req,res,next){
    try {
      const data = req.body

      const result = await axios({
        url,
        method: 'POST',
        data
      })
      
      if (result){
        res.status(201).json(result.data)
        await redis.del(redis_movies)
      }
    } catch (error) {
      next(error)
    }
  }

  static async update (req,res,next){
    try {
      const data = req.body
      const {id} = req.params

      const result = await axios({
        url:url+id,
        method: 'PUT',
        data
      })
      
      if (result){
        res.status(200).json(result.data)
        await redis.del(redis_movies)
      }
    } catch (error) {
      next(error)
    }
  }

  static async delete (req,res,next){
    try {
      const {id} = req.params

      const result = await axios({
        url:url+id,
        method: 'DELETE',
      })
      
      if (result){
        res.status(200).json(result.data)
        await redis.del(redis_movies)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController