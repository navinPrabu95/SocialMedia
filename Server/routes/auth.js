const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const requiredLogin = require('../Middleware/requiredLogin')
const JWT = require('jsonwebtoken')
const{JWT_SECRETKEY}= require('../env')
const User = require('../models/userModel')

router.post('/safe',requiredLogin,(request,response)=>{
    
    response.send("safeLogin")
})

router.post('/signup',(request,response)=>{

    const{name,email,password}= request.body

    if(name&&email&&password){
        User.findOne({email:email}).then((isEqual)=>{
            if(isEqual){
                response.status(422).json({errorMessage:'Email already exist'})
            }else{
                bcrypt.hash(password,12).then((hashedPassword)=>{
                    const user = new User({name,email,password:hashedPassword})
                    user.save().then(user=>{
                        response.status(200).json({sucessMessage:'User Created Sucessfully'})
                    }).catch((err)=>{
                        response.status(422).json({errorMessage:err})
                    })
                })
            }
        })
         
    }else{
        response.status(422).json({errorMessage:'Please enter all fields'})
    }
})

router.post('/signin',(request,response)=>{

    const{email,password} = request.body
    
    if(!email||!password){
        response.status(422).send({errorMessage:'enter valid Email or password'})
    }else{
        User.findOne({email:email}).then((DbUser)=>{
            if(DbUser){
                bcrypt.compare(password,DbUser.password).then((isEqual)=>{
                      if(isEqual){
                        // response.status(200).send({sucessMsg:'Login Sucessfully'})npm
                        const token=JWT.sign({_id:DbUser._id},JWT_SECRETKEY)
                        response.status(200).json({sucessMessage:"Login Sucessfully",token:token})

                      }else{
                        response.status(422).send({errorMessage:'Invalid Password'})
                      }
                })
            }else{
                response.status(422).send({errorMessage:'Invalid Email'})
            }
        }).catch(err=>{
            console.log(err);
        })
    }
})



module.exports = router