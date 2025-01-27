const mongoose = require('mongoose');
const { DB_CNN } = process.env;

const dbConnection = async() =>{
    try {
        await mongoose.connect(DB_CNN);
        console.log('Database online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error connecting to the database');
    }
}

module.exports = {
    dbConnection
}