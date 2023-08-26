const express = require('express')
const app = express();
const connection = require('./config/db')

connection()
app.get('/',(req,res)=>{
  res.json({message:"Hi dev ops"})
})


app.listen(8000,()=>{
  console.log("Server started sucessfully");
})