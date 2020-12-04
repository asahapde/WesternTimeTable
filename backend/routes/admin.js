const express = require('express');
const router = express.Router();

router.get('/getUsers', (req,res) => {
    User.find({}, (error, user) => {
        if(!user) return res.status(404).json({ message: 'Users not found'});
        else res.status(200).json({ user});
    });
})

router.put('/editUser', (req,res) => {
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