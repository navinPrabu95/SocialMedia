const mongoose=require('mongoose')

const Schma=mongoose.Schema

const userSchma = new Schma({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User',userSchma)

module.exports = User