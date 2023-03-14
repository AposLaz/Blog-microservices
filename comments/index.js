const express = require('express');
const {randomBytes} = require('crypto');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req,res)=>{
    res.send(commentsByPostId[req.params.id] || []) //if result is undefined return empty array
});

app.post('/posts/:id/comments', (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const {comment} = req.body;
    const comments = commentsByPostId[req.params.id] || []; //if undefined then give us an empty array

    comments.push({
        id: commentId,
        comment
    })
    commentsByPostId[req.params.id] = comments
    
    res.status(201).send(comments)
});



app.listen(5000, ()=>{
    console.log('Listening on port 5000')
})
