var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    question:{type: String},
    optionA: {type: String},
    optionB: {type: String},
    optionC: {type: String},
    optionD: {type: String},
    answer: {type: String}
});



module.exports = mongoose.model('Question', schema);