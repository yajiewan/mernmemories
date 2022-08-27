const { mongoose } = require('mongoose');
const jwt_decode = require('jwt-decode');
const UserCred = require('../models/userCreds');

const createNewUser = async (req, res) => {
    try {
        const userObj = jwt_decode(req.body.credential);
        const {name, email} = userObj;
        console.log(userObj);
        const newUser = new UserCred({email, name});
        newUser.save();
    } catch (error) {
        console.log(error);
    }
    
}



module.exports = {createNewUser};