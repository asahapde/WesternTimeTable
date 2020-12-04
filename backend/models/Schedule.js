const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
    name: {type: String, required: true, unique: true},
    username: {type: String, required: true, maxlength: 15},
    description: {type: String, max: 255, default: ""},
    public: {type: Boolean, default: false},
    courses: [{course: String, subject: String}],
})

scheduleSchema.set('timestamps', true);

module.exports = mongoose.model('schedule', scheduleSchema, 'schedules');