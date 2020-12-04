const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Schedule = require('../models/Schedule');
const Review = require('../models/Review');


router.get('/profile', (req, res) => {
    User.findOne({ _id: req._id }, (error, user) => {
        if (!user) return res.status(404).json({ status: false, message: 'User not found' });
        else res.status(200).json({ status: true, user });
    });
})

router.post('/updatePassword', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    } catch (error) {
        console.log(error);
    }

    User.updateOne({ _id: req._id }, { $set: { password: req.body.password } }, (error, user) => {
        if (!user) return res.status(404).json({ message: 'Password not updated' });
        else res.status(200).json({ message: 'Password updated' });
    });
})


// Route for getting all available schedules, adding new schedules
router.route('/schedules')
    .get(async (req, res) => {
        await User.findOne({ _id: req._id }, (err, user) => {
            if (err) res.status(404).json(err);
            if (user) {
                Schedule.find({ username: user.username }, function (err, schedules) {
                    if (err) res.status(404).json(err);
                    if (schedules.length > 0) {
                        res.status(200).send(schedules);
                    } else {
                        res.status(404).json({ message: 'Schedules not found for ' + user.username });
                    }
                });
            }
            else res.status(404).json({ message: 'User not found' });
        });


    })
    .post(async (req, res) => {
        const newName = req.body;

        await User.findOne({ _id: req._id }, (err, user) => {
            if (err) res.status(404).json(err);
            if (user) {
                if (newName.name) {
                    if (newName.name.length > 10) {
                        res.status(404).send(`${newName.name} is more than 10 characters`);
                        return;
                    }

                    let schedule = new Schedule({ name: newName.name, username: user.username, description: newName.description });
                    // Insert the name to database
                    schedule.save((err, schedule) => {
                        if (err) {
                            res.status(400).json(err);
                        }
                        else res.status(200).send(schedule);
                    });
                }
                else res.status(400).send('Missing name');
            }
            else res.status(404).json({ message: 'User not found' });
        });
    })
    .delete((req, res) => {
        database.remove({}, { multi: true }, (err, numRemoved) => {
            if (numRemoved > 0) res.send(numRemoved + ' schedules removed');
            else res.send(`No schedules removed`);
        })

        Schedule.deleteMany({}, (error, deletedSchedules) => {
            if (error) res.status(400).json(err);
            res.status(200).json({ message: `${deletedSchedules.length} schedules are removed` });
        });

    })


// Route for updating and deleting schedules
router.route('/schedules/:name')
    .put(async (req, res) => {
        const updateName = req.params.name;
        const updateContent = req.body;

        if (updateName.length > 10) {
            res.status(404).send(`${updateName} is more than 10 characters`);
            return;
        }


        await User.findOne({ _id: req._id }, (err, user) => {
            if (err) res.status(404).json(err);
            if (user) {
                if (updateContent) {
                    Schedule.findOneAndUpdate({ name: updateName, username: user.username }, { $set: updateContent }, (err, schedules) => {
                        if (err) res.status(404).json(err);
                        if (schedules) res.status(200).send(schedules);
                        else res.status(404).send(`${updateName} schedule does not exist`);
                    })
                }
                else res.status(404).send(`${updateContent} does not contain course data`);
            }
            else res.status(404).json({ message: 'User not found' });
        });
    })
    .delete(async (req, res) => {
        const removeName = req.params.name;

        Schedule.findOneAndDelete({ name: removeName }, (err, numRemoved) => {
            if (err) res.status(404).json(err);
            if (numRemoved) res.status(200).send(removeName + ' removed');
            else res.status(404).send(`${removeName} schedule does not exist`);
        })

    })


router.post('/reviews', async (req, res) => {

    await User.findOne({ _id: req._id }, (err, user) => {
        if (err) res.status(404).json(err);
        if (user) {

            let reviewData = req.body;
            reviewData.username = user.username;
            let review = new Review(reviewData)
            review.save((error, savedReview) => {
                if (error) {
                    res.status(404).send(error);
                } else {
                    res.status(200).send(savedReview);
                }
            })
        }
        else res.status(404).json({ message: 'User not found' });
    });

});

module.exports = router;