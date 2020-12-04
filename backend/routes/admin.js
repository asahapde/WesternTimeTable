const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const Policy = require('../models/Policy');
const Log = require('../models/Log');

router.get('/getUsers', (req, res) => {
    User.find({}, (error, user) => {
        if (error) res.status(404).json(error);
        if (!user) return res.status(404).json({ message: 'Users not found' });
        else res.status(200).json({ user });
    });
})

router.put('/editUser/:username', (req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, { $set: req.body }, (error, user) => {
        if (error) res.status(404).json(error);
        if (!user) return res.status(404).json({ message: 'User not found' });
        else res.status(200).json({ user });
    });
})


router.post('/policy', (req, res) => {
    let policyData = req.body;
    let policy = new Policy(policyData)
    policy.save((error, savedPolicy) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.status(200).send(savedPolicy);
        }
    })
})

router.post('/logs', (req, res) => {
    let logData = req.body;
    let log = new Log(logData)
    log.save((error, savedLog) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.status(200).send(savedLog);
        }
    })
})

router.put('/policy/:id', (req, res) => {
    Policy.findOneAndUpdate({ _id: req.params.id}, { $set: req.body }, (error, policy) => {
        if (error) res.status(404).json(error);
        if (!policy) return res.status(404).json({ message: 'User not found' });
        else res.status(200).json({ policy });
    });
})

// Get all reviews
router.get('/reviews', (req, res) => {
    Review.find({}, (error, review) => {
        if (error) {
            console.log(error);
            res.status(404).json(error);
        } else {
            if (review.length == 0) return res.status(404).json({ message: 'No public Reviews found' });
            else res.status(200).json(review);
        }
    }).sort({ updatedAt: -1 })
})

module.exports = router;