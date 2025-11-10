// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Direct connection to local MongoDB Compass
    const conn = await mongoose.connect("mongodb://localhost:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Connected to MongoDB Compass (Local): ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Failed: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
