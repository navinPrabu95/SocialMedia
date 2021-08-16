const mongoose=require('mongoose')
const{ObjectId} = mongoose.Schema.Types

const postSchma= new mongoose.Schema({
    title:{
       type:String,
       required:true 
    },
    body:{
        type:String,
        required:true 
     },
     photo:{
         type:String,
         default:"No Photo"
     },
     postedBy:{
         type:ObjectId,
         ref :"User"
     }

})

const Post = mongoose.model('Post',postSchma)

module.exports = Post