var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect('localhost', 'reporta');
autoIncrement.initialize(connection);

var dataSourceSchema = new Schema({
  owner_id: String,
  name: String,
  url: String,
  updated_on : Date,
  created_on : Date
});

var templateSchema = new Schema({
  owner_id: String,
  name: String,
  content: String,
  updated_on : Date,
  created_on : Date
});

dataSourceSchema.plugin(autoIncrement.plugin, 'dataSource');
templateSchema.plugin(autoIncrement.plugin, 'template');

connection.model('dataSource', dataSourceSchema);
connection.model('template', templateSchema);
