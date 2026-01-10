const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.warn('MONGO_URI not set in .env - skipping MongoDB connection');
    return;
  }

  try {
  // Mongoose v6+ enables sensible defaults and removed some connection options
  // so pass only the URI (additional options can be added if needed)
  await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit the process - in development you may want to keep the server running
    process.exit(1);
  }
};

module.exports = connectDB;
