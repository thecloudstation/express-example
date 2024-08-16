const mongoose = require('mongoose');
const inMemoryStorage = require('../utils/inMemoryStorage');

let storage = 'in-memory';

const connectDB = async () => {
    if (process.env.MONGODB_URL) {
        try {
            await mongoose.connect(process.env.MONGODB_URL, {
                serverSelectionTimeoutMS: 5000, // 5 second timeout
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            });
            console.log('MongoDB connected');
            storage = 'mongodb';
        } catch (error) {
            console.error('MongoDB connection error:', error);
            console.log('Falling back to in-memory storage');
            storage = 'in-memory';
        }
    } else {
        console.log('No MongoDB URL provided. Using in-memory storage.');
        storage = 'in-memory';
    }
};

const getStorage = () => storage;

const toggleStorage = () => {
    storage = storage === 'mongodb' ? 'in-memory' : 'mongodb';
    console.log(`Switched to ${storage} storage`);
};

module.exports = { connectDB, getStorage, toggleStorage };