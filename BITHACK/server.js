const express = require('express')
const cors =require('cors')
const app = express()
app.use(express.json())

app.use(cors())

app.get('/hello',async(req,res)=>{
    res.status(200).json({message:"Bithack"})
})

app.listen(3000,()=>{
  console.log("Server Successfully connected")
})