const express = require('express')
const cors =require('cors')
const {MONGOURL,PORT}=require('./env')
const mongoose=require('mongoose')




mongoose.connect(MONGOURL,{useNewUrlParser: true,useUnifiedTopology: true})

mongoose.connection.on('connected',()=>{ 
    console.log("DB connected sucessfully");
})

mongoose.connection.on("DB connection error",(err)=>{
    console.log("DB not connected",err);
})

mongoose.Promise = global.Promise

const app =  express()
app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))





app.listen(PORT,()=>{
    console.log("app started at"+PORT);
})