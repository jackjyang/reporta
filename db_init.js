var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect('localhost', 'reporta');
autoIncrement.initialize(connection);

var dataSourceSchema = new Schema({
  owner_id: String,
  name: String,
  system: Object,
  trace: Object,
  updated_on: Date,
  created_on: Date
});
dataSourceSchema.index({ owner_id: 1, name: -1 }, { unique: true });
dataSourceSchema.plugin(autoIncrement.plugin, 'dataSource');

// var dataSetSchema = new Schema({
//   owner_id: String,
//   name: String,
//   source_name: String,
//   properties: Object,
//   updated_on: Date,
//   created_on: Date
// });
// dataSetSchema.index({ owner_id: 1, name: -1 }, { unique: true });
// dataSetSchema.plugin(autoIncrement.plugin, 'dataSet');

var templateSchema = new Schema({
  owner_id: String,
  name: String ,
  content: String,
  updated_on: Date,
  created_on: Date
});
templateSchema.index({ owner_id: 1, name: -1 }, { unique: true });
templateSchema.plugin(autoIncrement.plugin, 'template');

var recipeSchema = new Schema({
  data_source_name: String,
  template_name: String,
  owner_id: String,
  name: String,
  content: String,
  updated_on: Date,
  created_on: Date
});
recipeSchema.index({ owner_id: 1, name: -1 }, { unique: true });
recipeSchema.plugin(autoIncrement.plugin, 'recipe');

var counterSchema = new Schema({
  id: Number,
  value: Number
});

var formSchema = new Schema({
  recipe_name: String,
  template_name: String,
  owner_id: String,
  name: String,
  form: String,
  selections: String,
  updated_on: Date,
  created_on: Date
});
formSchema.index({ owner_id: 1, name: -1 }, { unique: true });
formSchema.plugin(autoIncrement.plugin, 'form');

connection.model('dataSource', dataSourceSchema);
// connection.model('dataSet', dataSetSchema);
connection.model('template', templateSchema);
connection.model('recipe', recipeSchema);
connection.model('counter', counterSchema);
connection.model('form', formSchema);
