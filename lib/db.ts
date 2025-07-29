import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDB() {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not set in environment variables');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}
