const {ObjectID} = require('mongodb')
const {getDatabase} = require('../config/mongodb')

class TVSeries {
  static db() {
    return getDatabase().collection('tv_series')
  }
  static find() {
    return this.db().find().toArray()
  }
  static findOne(id) {
    return this.db().findOne({_id: ObjectID(id)})
  }
  static insertOne(data){
    return this.db().insertOne(data)
  }
  static update (id, data) {
    return this.db().updateOne({_id: ObjectID(id)}, {$set: data}, {new: true})
  }
  static deleteOne(id){
    return this.db().deleteOne({_id: ObjectID(id)})
  }
}

module.exports = TVSeries