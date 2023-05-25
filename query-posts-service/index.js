const express = require('express')
const cors = require('cors')
const {PORT} = require('./config/index')
const {connectMongoose} = require('./db/connectDB')
const blogAPI = require('./controller/blog-controller')

const app = express()

//connect to Kafka
require('./kafkaConsumer')

//connect to database
connectMongoose()
.then(console.log('Connected to Database'))
.catch((err)=>{
    console.log(err)
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//APIs
app.use(blogAPI)

app.listen(PORT, ()=>{
    console.log('Listening on port '+PORT)
})