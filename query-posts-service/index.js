const express = require('express')
const cors = require('cors')
const {posts_comments} = require('./kafkaConsumer')
const {PORT} = require('./config/index')
const {connectMongoose} = require('./db/connectDB')

const app = express()

//connect to database
connectMongoose()
.then(console.log('Connected to Database'))
.catch((err)=>{
    console.log(err)
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/posts',(req,res)=>{
    res.send(posts_comments)
})

app.listen(PORT, ()=>{
    console.log('Listening on port '+PORT)
})