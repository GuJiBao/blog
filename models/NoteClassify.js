var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteClassifySchema = new Schema({
  order: Number,
  name: String,
  url: {
    type: String,
    default: '/'
  }
});

module.exports = mongoose.model('NoteClassify', NoteClassifySchema);

