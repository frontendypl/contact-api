require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Routers
const topicRouter = require('./src/routers/topic')
const messageRouter = require('./src/routers/message')
const answerRouter = require('./src/routers/answer')
//

const uri = `mongodb+srv://${process.env.DATABASE_CONNECTION}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(uri)
    .then(res=>{
        console.log(`Connected to Mongo! Database name: "${res.connections[0].name}"`)
    })
    .catch(error=>{
        console.error('Error connecting to mongo',error.reason)
    })

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())

//use Routes
app.use(topicRouter)
app.use(messageRouter)
app.use(answerRouter)
//

app.listen(process.env.PORT, ()=>{
    console.log('App is running on port', process.env.PORT)
})