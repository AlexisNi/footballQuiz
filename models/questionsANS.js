var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    questionId:[{ type: Schema.Types.ObjectId, ref: 'Question' }],
    answer:{type:Boolean}
});



module.exports = mongoose.model('QuestionANS', schema);