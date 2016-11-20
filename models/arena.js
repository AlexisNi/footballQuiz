var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator=require('mongoose-unique-validator');

var schema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    invite:{type: Schema.Types.ObjectId, ref: 'User'},
    status_accept: {type: Boolean},
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});






schema.index({invite:1, user:1},{unique:true});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('Arena', schema);