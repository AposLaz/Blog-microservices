const express = require('express')
const cors = require('cors')
const {posts_comments} = require('./kafkaConsumer')

/**
 * Run Kafka Consumer here
 */


const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/posts',(req,res)=>{
    console.log(posts_comments)
    res.send(posts_comments)
})

app.listen(4003, ()=>{
    console.log('Listening on Port 4003')
})