const mongoose = require('mongoose');

const connectDB = async () => {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;