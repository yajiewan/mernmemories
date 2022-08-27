const express = require('express');

const {createNewUser} = require('../controllers/auth');
const authRouter = express.Router();

authRouter.route('/').post(createNewUser);

module.exports = {authRouter}; 