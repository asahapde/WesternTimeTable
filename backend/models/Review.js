const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    course: {course: String, subject: String},
    review: [String],
    lastmodified: {type: Date, default: Date.now},
})

module.exports = mongoose.model('review', reviewSchema, 'reviews');