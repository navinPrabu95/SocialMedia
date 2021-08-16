const express = require('express')
const router = express.Router()
const requiredLogin = require('../Middleware/requiredLogin')
const Post = require('../models/postModel')


router.post('/createPost',requiredLogin,(request,response)=>{
    const{title,body} = request.body
    
    if(!title||!body){
        response.status(422).send({errorMessage:'title or body Invalid'})
    }else{
            const post = new Post({
                title,
                body,
                postedBy:request.user})

            post.save().then(result=>{
                response.status(422).send({sucessMessage:result})
            })

        console.log(request.user);
    }
})

router.get('/allpost',(request,response)=>{
    Post.find().populate('postedBy','_id name email').then(result=>{
        response.status(200).json({sucessMessage:result})
    }).catch(err=>{
        response.send(err)
    })
})

router.get('/mypost',requiredLogin,(request,response)=>{

    Post.find({postedBy:request.user._id}).populate('postedBy','_id name email').then((result)=>{
        response.json({sucessMessage:result})
    })
})

module.exports = router