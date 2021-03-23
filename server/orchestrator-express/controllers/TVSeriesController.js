const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')
const url = 'http://localhost:4002/series/'
const redis_series = 'series:data'

class TVSeriesController {
  static async getAll (req,res,next){
    try {
      const series = await redis.get(redis_series)

      if(series){
        return res.status(200).json(JSON.parse(series))
      }else{
        const {data} = await axios({
          url,
          method: 'GET'
        })
        redis.set(redis_series, JSON.stringify(data))
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
        await redis.del(redis_series)
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
        await redis.del(redis_series)
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
        await redis.del(redis_series)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TVSeriesController