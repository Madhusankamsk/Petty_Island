require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routers
app.use('/api',require('./routes/authRouter'))
app.use('/api',require('./routes/userRouter'))



const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log('Server listening on port',port)
})
