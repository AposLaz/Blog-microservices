const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors')
const {commentBlog} = require('./kafkaProducer')
const {PORT} = require('./config/index')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let commentsByPostId = {};

app.get('/posts/:id/comments', (req,res)=>{
    res.send(commentsByPostId[req.params.id] || []) //if result is undefined return empty array
});

app.post('/posts/:id/comments', (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {comment} = req.body;

    const comments = {
        id: commentId,
        content: comment
    }

    const commentsByPost = {
        post_id: req.params.id,
        comments
    }
    
    commentsByPostId[req.params.id] = comments

    commentBlog(commentsByPost)
    res.status(201).send(comments)
});



app.listen(PORT, ()=>{
    console.log('Listening on port '+PORT)
})
