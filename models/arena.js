var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    invite:{type: Schema.Types.ObjectId, ref: 'User'},
    status_accept: {type: Boolean}
});



module.exports = mongoose.model('Arena', schema);