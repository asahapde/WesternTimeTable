const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
    name: {type: String, required: true},
    public: {type: Boolean, default: false},
    courses: [{course: String, subject: String}],
})

module.exports = mongoose.model('schedule', scheduleSchema, 'schedules');