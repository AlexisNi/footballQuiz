var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cryptjs=require('bcryptjs');
var schema = new Schema({

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Token', schema);