const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/posts',(req,res)=>{
    res.send('OK')
})

app.listen(4003, ()=>{
    console.log('Listening on Port 4003')
})