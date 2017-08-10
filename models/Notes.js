var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
  noteClassify: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteClassify'
  },
  title: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  addTime: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  comments: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Notes', NotesSchema);
