const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv/config');


// Add cors for Angular
app.use(cors());

// Serve Front-End
app.use('/', express.static('static'));

// Middleware for logging
app.use((req,res,next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Parse data as json
app.use(express.json());

// Install the router at /api/courses
app.use('/api', router);




// Connect to DB
mongoose.connect( process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true}, () => 
    console.log('Connected to DB!')
);

// Listen to the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});