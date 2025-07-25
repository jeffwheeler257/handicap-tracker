import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

export const connectToDb = async() => {
    try {
        await mongoose.connect(uri, {
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
            dbName: 'htdb',
            authSource: 'admin'
        });
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('MongoDB connection error: ', error);
        throw error;
    }
};