const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    title: {type: String, max: 30},
    courseId: {type: String, required:true},
    review: {type: String , max: 255},
    hidden: {type: Boolean, default: false}
})

scheduleSchema.set('timestamps', true);

module.exports = mongoose.model('review', reviewSchema, 'reviews');