export const databaseConfig = {
    host: process.env.MONGODB_HOST || 'mongodb://localhost:27017',
    database: process.env.DATABASE_NAME || 'mycoolfood',
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
}