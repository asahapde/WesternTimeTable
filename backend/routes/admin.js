const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Schedule = require('../models/Schedule');
const Review = require('../models/Review');
const Policy = require('../models/Policy');
const Log = require('../models/Log');

router.get('/getUsers', (req,res) => {
    User.find({}, (error, user) => {
        if(!user) return res.status(404).json({ message: 'Users not found'});
        else res.status(200).json({ user});
    });
})

router.put('/editUser/:username', (req,res) => {
    User.findOneAndUpdate({ username: req.params.username }, { $set: req.body },(error, user) => {
        if (!user) return res.status(404).json({message: 'User not found' });
        else res.status(200).json({user });
    });
})


router.post('/policy/:id', (req, res) => {
    
})


router.put('/policy/:id', (req, res) => {
})

// Get all reviews
router.get('/reviews', (req, res) => {
    Review.find({ }, (error, review) => {
        if (error) {
            console.log(error);
        } else {
            if (review.length == 0) return res.status(404).json({ message: 'No public Reviews found' });
            else res.status(200).json(review);
        }
    }).sort({ updatedAt: -1 })
})

module.exports = router;