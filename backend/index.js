const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv/config');
require('./config/passportConfig');

// Routes
const openRoute = require('./routes/open');
const secureRoute = require('./routes/secure');
const adminRoute = require('./routes/admin');

// Add cors for Angular
app.use(cors());

// Serve Front-End
app.use('/', express.static('static'));

// Middleware for logging
app.use((req,res,next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.use(passport.initialize());

// Parse data as json
app.use(express.json());

// Install the router at /api
app.use('/api/open', openRoute);
app.use('/api/secure', secureRoute);
app.use('/api/admin', adminRoute);


// Connect to DB
mongoose.connect( process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true}, () => 
    console.log('Connected to DB!')
);

// Listen to the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});