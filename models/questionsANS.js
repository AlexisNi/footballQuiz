var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    arenaId:{ type: Schema.Types.ObjectId, ref: 'Arena' },
    userId:{ type: Schema.Types.ObjectId, ref: 'User' },
    questionId:[{ type: Schema.Types.ObjectId, ref: 'Question' }],
    answer:{type:Boolean}
});



module.exports = mongoose.model('ArenaQuestion', schema);