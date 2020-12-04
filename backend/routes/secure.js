const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.get('/profile', (req,res) => {
    User.findOne({_id: req._id}, (error, user) => {
        if(!user) return res.status(404).json({ status: false, message: 'User not found'});
        else res.status(200).json({ status: true, user});
    });
})

router.post('/updatePassword', async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
    }

    User.updateOne({_id: req._id}, { $set: { password: req.body.password } }, (error, user) => {
        if(!user) return res.status(404).json({ message: 'Password not updated'});
        else res.status(200).json({ message: 'Password updated'});
    });
})


module.exports = router;