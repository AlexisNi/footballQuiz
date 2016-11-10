var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    id_arena:{ type: Schema.Types.ObjectId, ref: 'Arena' },
    question_id: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
   // playing_user: {type: Boolean}
});



module.exports = mongoose.model('QuestionArena', schema);