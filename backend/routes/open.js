const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Schedule = require('../models/Schedule');
const passport = require('passport');
const fs = require('fs');

// Read the external json file and save it in an array
let timetable_data = JSON.parse(fs.readFileSync('./Lab3-timetable-data.json'));


router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    passport.authenticate('local', (err, user, info) => {       
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res);

})


// Route for getting all available subject codes
router.route('/courses')
    .get((req,res) => {
        res.send(timetable_data);
    })

// Route for getting all course codes given subject code
router.route('/courses/:subject')
    .get((req,res) => {
        const sub_code = req.params.subject;

        if(sub_code.length > 10) {
            res.status(404).send(`${sub_code} is more than 10 characters`);
            return;
        }

        const regex = /[a-zA-z]+$/;
        
        if (!sub_code.match(regex)){
            res.status(404).send(`${sub_code} does not only contain alphabets`);
            return;
        }

        const course_codes = timetable_data.filter((data) => String(data.subject) === sub_code.toUpperCase());
        if(course_codes.length > 0) res.send(course_codes);
        else res.status(404).send(`Subject ${sub_code} was not found`);

        
    })

// Route for getting timetable entry for a given subject code, a course code and an optional course component
router.route('/courses/:subject/:course/:component?')
    .get((req,res) => {
        const sub_code = req.params.subject;
        const course_code = req.params.course;
        const component_code = req.params.component;

        if(sub_code.length > 10) {
            res.status(404).send(`${sub_code} is more than 10 characters`);
            return;
        }

        const regex = /[a-zA-z]+$/;
        
        if (!sub_code.match(regex)){
            res.status(404).send(`${sub_code} does not only contain alphabets`);
            return;
        }

        if(course_code.length > 5) {
            res.status(404).send(`${course_code} is more than 5 characters`);
            return;
        }

        const regex2 = /[a-zA-Z0-9]+$/;
        
        if (!course_code.match(regex2)){
            res.status(404).send(`${course_code} does not only contain alphabets and letters`);
            return;
        }

        

        // Filter through subcode
        let filtered_data = timetable_data.filter((data) => String(data.subject) === sub_code.toUpperCase());
        
        // Send error message if Subject does not exist
        if(filtered_data.length == 0){
            res.status(404).send(`Subject ${sub_code} was not found`);
            return;
        }

        // Filter through coursecode
        filtered_data = filtered_data.filter((data) => String(data.catalog_nbr) === course_code.toUpperCase());

        // Send error message if Course does not exist
        if(filtered_data.length == 0){
            res.status(404).send(`Course ${course_code} was not found`);
            return;
        }

        // If component code exists
        if(component_code) {
            if(component_code.length > 3) {
                res.status(404).send(`${course_code} is more than 3 characters`);
                return;
            }
            filtered_data = filtered_data.filter((data) => String(data.course_info[0].ssr_component) === component_code);

            // Send error message if Coomponent does not exist
            if(filtered_data.length == 0){
                res.status(404).send(`Component ${component_code} was not found`);
                return;
            }
        }

        // Send the data
        res.send(filtered_data);
    })

// Get 10 public course list
router.get('/schedules', (req,res) => {
    Schedule.find({public: true}, (error, schedule) => {
        if (error) {
            console.log(error);
        } else {
            if(schedule.length == 0) return res.status(404).json({ message: 'No public Schedules found' });
            else res.status(200).json({ Schedule });
        }
    }).sort({updatedAt:-1})
})

// Get keyword
router.get('/courses/keywords', (req,res) => {
})




module.exports = router;