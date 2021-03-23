const TVSeries = require('../models/TVSeries')

class TVSeriesController {
  static async getAll(req,res){
    try {
      const response = await TVSeries.find()
      console.log(response);
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async create(req,res){
    try {
      const data = req.body
      const response = await TVSeries.insertOne( data)
      // console.log('this');
      res.status(201).json(response.ops)

    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async getOne(req,res){
    try {
      const {id} = req.params
      const response = await TVSeries.findOne(id)

      if (response) {
        res.status(200).json(response.ops)
      }else{
        res.status(404).json({message: 'TVSeries Not Found'})
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async update(req,res){
    try {
      const {id} = req.params
      const data = req.body
      const response = await TVSeries.update(id, data)
      
      if (response.result.ok){
        res.status(200).json({message: 'update success'})
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'})
    }
  }

  static async delete(req,res){
    try {
      const {id} = req.params
      const response = await TVSeries.deleteOne(id)
      
      if (response.result.ok){
        res.status(200).json({message: 'delete success'})
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'})
    }
  }
}

module.exports = TVSeriesController