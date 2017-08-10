var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  name: String,
  bookClassify: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookClassify'
  },
  description: String,
  cover: String,
  downloadLink: String,
  downloadPw: String,
  addTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Book', bookSchema);

