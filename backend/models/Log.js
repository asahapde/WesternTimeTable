const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const logSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    dateRecieved : {type: String, required: true},
    dateSent : {type: String, required: true},
})

logSchema.set('timestamps', true);

module.exports = mongoose.model('log', logSchema, 'logs');