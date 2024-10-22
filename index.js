const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.js');
//routes
const urlRoute = require('./src/routes/url.js')
dotenv.config();

const app = express();
app.use(express.json());
app.use('/url', urlRoute)
const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};


startServer();
