const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const {postRouter} = require('./routes/posts');
const {authRouter} = require('./routes/auth');
const {userRouter} = require('./routes/user');

const app = express();
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
})

const {connectDB} = require('./db/connect');
connectDB();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/posts', postRouter);
// app.use('/auth', authRouter);
app.use('/user', userRouter);

// https://www.mongodb.com/cloud/atlas
