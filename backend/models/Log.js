const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const logSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true, max: 255},
    dataRecieved : {type: Date, required: true},
    dataSent : {type: Date, required: true},
})

logSchema.set('timestamps', true);

module.exports = mongoose.model('log', logSchema, 'logs');