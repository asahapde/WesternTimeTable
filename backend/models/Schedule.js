const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, maxlength: 15},
    public: {type: Boolean, default: false},
    courses: [{course: String, subject: String}],
    lastmodified: {type: Date, default: Date.now},
})

module.exports = mongoose.model('schedule', scheduleSchema, 'schedules');