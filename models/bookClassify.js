var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookClassifySchema = new Schema({
  order: Number,
  name: String
});

module.exports = mongoose.model('BookClassify', BookClassifySchema);

