const jwt = require('jsonwebtoken')
const{JWT_SECRETKEY} = require('../env')
const mongoose = require('mongoose')
const User = require('../models/userModel')


module.exports = (request,response,next)=>{
    const{authorization} = request.headers

    if(!authorization){
        return response.status(401).json({errorMsg:'you should login first'})
    }else{
       const token = authorization.replace("Bearer ","")

       jwt.verify(token,JWT_SECRETKEY,(err,payload)=>{

         if(err){
            return response.status(401).json({errorMsg:'you should login first'})
         }else{

           const{_id} = payload
           User.findById(_id).then(userData=>{
               request.user = userData
               next()
           })
         }
       })

    }
}