const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
})

const UserCred = mongoose.model("UserCreds", userSchema);

module.exports = UserCred;
