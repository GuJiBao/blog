var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenusSchema = new Schema({
  order: Number,
  name: String,
  url: {
    type: String,
    default: '/'
  }
});

module.exports = mongoose.model('Menus', MenusSchema);
