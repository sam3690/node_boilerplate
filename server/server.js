require('dotenv').config();
const express = require('express');
const session = require('express-session')
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const protectedRoutes = require('./routes/protectedRoutes');
const userRoutes = require('./routes/users');


//Middlewares

app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(morgan('dev'));


//Session 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use('/api/users', userRoutes);
app.use('/api/protected', protectedRoutes);

//Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//Start server

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})