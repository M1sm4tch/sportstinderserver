const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); 
  }
};

module.exports = connectToMongoDB;