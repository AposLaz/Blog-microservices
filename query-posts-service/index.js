const express = require('express')
const cors = require('cors')
const {posts_comments} = require('./kafkaConsumer')
const {PORT} = require('./config/index')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/posts',(req,res)=>{
    console.log(posts_comments)
    res.send(posts_comments)
})

app.listen(PORT, ()=>{
    console.log('Listening on port '+PORT)
})