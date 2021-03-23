const {gql} = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

const urlSeries = 'http://localhost:4002/series/'
const redis_series = 'series:data'

const typeDefs = gql`
  type Serie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    series: [Serie]
    serie(_id: String): Serie
  }

  input AddSerie{
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input UpdateSerie{
    _id: String!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input DeleteSerie{
    _id: String!
  }

  type Message{
    message: String
  }

  extend type Mutation{
    addSerie(data: AddSerie): Serie
    updateSerie(data: UpdateSerie): Serie
    deleteSerie(_id: String): Message
  }
`
const resolvers = {
  Query: {

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

module.exports = {
  typeDefs,
  resolvers
}