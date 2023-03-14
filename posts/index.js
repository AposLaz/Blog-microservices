const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const posts = {}; //store all posts that we post

app.get('/posts', (req,res)=>{
    res.send(posts)
})

app.post('/posts', (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body

    posts[id] = {
        id,
        title
    }

    res.status(201).send("Post Created")
})

app.listen(4000, ()=>{
    console.log('Listening on port 4000')
})