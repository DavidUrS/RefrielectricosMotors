const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callSchema = new Schema({
    phone : String,
    name : String

});

module.exports = mongoose.model('calls', callSchema);