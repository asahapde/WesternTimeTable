const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const policySchema = new Schema({
    security: {type: String, max: 255},
    aup: {type: String, max: 255},
    dmca: {type: String, max: 255},
})

policySchema.set('timestamps', true);

module.exports = mongoose.model('policy', policySchema, 'policies');