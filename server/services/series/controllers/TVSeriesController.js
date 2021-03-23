const TVSeries = require('../models/TVSeries')

class TVSeriesController {
  static async getAll(req,res,next){
    try {
      const response = await TVSeries.find()
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req,res,next){
    try {
      const {id} = req.params
      const response = await TVSeries.findOne(id)

      if (response) {
        res.status(200).json(response)
      }else{
        res.status(404).json({message: 'TVSeries Not Found'})
      }

    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      const {id} = req.params
      const {title,poster_path,overview,popularity, tags} = req.body
      const data = {title,poster_path,overview,popularity, tags}
      const isTVSeriesExist = await TVSeries.findOne(id)

      if(isTVSeriesExist){
        const response = await TVSeries.update(id, data)
        if (response.result.ok){
          const updatedTvSeries = await TVSeries.findOne(id)
          res.status(200).json(updatedTvSeries)
        }
      }else{
        next({name: 'NotFound'})
      }

    } catch (error) {
      next(error)
    }
  }

  static async create(req,res,next){
    try {
      const {title,poster_path,overview,popularity, tags} = req.body
      const data = {title,poster_path,overview,popularity, tags}
      
      const response = await TVSeries.insertOne( data)
      
      res.status(201).json(response.ops)

    } catch (error) {
      next(error)
    }
  }

  static async delete(req,res,next){
    try {
      const {id} = req.params
      const isTVSeriesExist = await TVSeries.findOne(id)

      if(isTVSeriesExist){
        const response = await TVSeries.deleteOne(id)
        
        if (response.result.ok){
          res.status(200).json({message: 'delete success'})
        }
      }else{
        next({name: 'NotFound'})
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = TVSeriesController