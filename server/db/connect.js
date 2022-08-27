const mongoose = require('mongoose');
const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URL).
        then(() => {
            console.log("Connected to database");
        }).catch((error) => {
            console.log(error.message);
        })   
}

module.exports = {connectDB};