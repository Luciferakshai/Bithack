const mongoose = require('mongoose');

const connectDb = async()=>{
  try{
    // Connect to MongoDB
    mongoose.connect('mongodb://127.0.0.1:27017/your-database-name', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
    
    // Define a MongoDB schema and model for your data
    const leaderboardSchema = new mongoose.Schema({
        name: String,
        score: Number
    });
    
    const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
    
    // Example: Insert data into the leaderboard
    const newPlayer = new Leaderboard({
        name: 'Tej',
        score: 950
    });
    
    newPlayer.save()
    .then(() => {
        console.log('Player added to leaderboard');
    })
    .catch((err) => {
        console.error('Error adding player to leaderboard', err);
    });
    
  }catch(e){
    console.log(e)
  }
}

module.exports = connectDb;