const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req,res) => {
    res.send('From Open Route');
})

router.post('/register', (req,res) => {
    let userData = req.body;
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser);
        }
    })
})

router.post('/login', (req,res) => {
})

module.exports = router;