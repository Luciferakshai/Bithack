const mongoose = require('mongoose');

const connectDb = async()=>{
  try{
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/users');
      console.log(`Mongo DB connected successfully `)
  }catch(e){
    console.log(e)
  }
}

module.exports = connectDb;