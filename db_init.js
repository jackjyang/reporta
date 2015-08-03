var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var connection = mongoose.connect('localhost', 'reporta');

var dataSourceSchema = new Schema({
  owner_id: String,
  name: String,
  url: String,
  updated_on: Date,
  created_on: Date
});
dataSourceSchema.index({ owner_id: 1, name: -1 }, { unique: true });

var templateSchema = new Schema({
  owner_id: String,
  name: String ,
  content: String,
  updated_on: Date,
  created_on: Date
});
templateSchema.index({ owner_id: 1, name: -1 }, { unique: true });

connection.model('dataSource', dataSourceSchema);
connection.model('template', templateSchema);
