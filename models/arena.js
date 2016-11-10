var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    user_id:{type: String},
    invite: {type: String},
    status_accept: {type: Boolean}
});



module.exports = mongoose.model('Arena', schema);