const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const {connect} = require('./config/mongodb')
const router = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/movies',router)

connect().then(()=>{
  console.log('mongodb running');
  app.listen(port,()=>{
    console.log('movies running '+port);
  })
})
