const Movie = require('../models/Movie')

class MovieController {
  static async getAll(req,res,next){
    try {
      const response = await Movie.find()
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req,res,next){
    try {
      const {id} = req.params
      const response = await Movie.findOne(id)
      // console.log(response);
      if (response) {
        res.status(200).json(response)
      }else{
        res.status(404).json({message: 'Movie Not Found'})
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
      const isMovieExist = await Movie.findOne(id)

      if(isMovieExist){
        const response = await Movie.update(id, data)
        if (response.result.ok){
          const updatedMovies = await Movie.findOne(id)
          res.status(200).json(updatedMovies)
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
      
      const response = await Movie.insertOne( data)
      
      res.status(201).json(response.ops)

    } catch (error) {
      next(error)
    }
  }

  static async delete(req,res,next){
    try {
      const {id} = req.params
      const isMovieExist = await Movie.findOne(id)

      if(isMovieExist){
        const response = await Movie.deleteOne(id)
        
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

module.exports = MovieController