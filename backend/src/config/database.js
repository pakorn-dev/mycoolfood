const mongoose = require('mongoose');
const { databaseConfig } = require('./database-config');


const connectDB = async () => {
    try {
        const username = encodeURIComponent(databaseConfig.username);
        const password = encodeURIComponent(databaseConfig.password);
        const mongoUri = `mongodb+srv://${username}:${password}@${databaseConfig.host}/${databaseConfig.database}`;
        const conn = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
