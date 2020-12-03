const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/profile', (req,res) => {
    User.findOne({_id: req._id}, (error, user) => {
        if(!user) return res.status(404).json({ status: false, message: 'User not found'});
        else res.status(200).json({ status: true, user});
    });

})

module.exports = router;