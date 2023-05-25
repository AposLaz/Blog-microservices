const express = require('express')
const router = new express.Router()
const CRUD = require('../services/blog-service')

router.get('/posts', (req,res)=>{
    try{
       CRUD.blog_retrieve((err,result)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.status(200).send(result)
        }
       })
    }catch(e){
       res.status(500).send('Error: '+e.message)
   }
})

module.exports = router;
