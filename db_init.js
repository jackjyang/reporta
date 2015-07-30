var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var templateSchema = new Schema({
  owner_id: String,
  content: String,
  updated_at : Date,
  created_at : Date
});

mongoose.model('template', templateSchema);
mongoose.connect('mongodb://localhost/reporta-db')
