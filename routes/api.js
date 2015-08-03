var mongoose = require('mongoose');
var dataSource = mongoose.model('dataSource');
var template = mongoose.model('template');

var apiHandler = new APIHandler();
exports.handler = function(req, res) {
  // Express routing for REST API.

  var data = req.method == 'GET' ? req.query : req.body;
  res.json(apiHandler.handleRequest(req.params.request, data));
};

function APIHandler(action, data) {
  // Empty constructor.
}

APIHandler.prototype.handleRequest = function(request, data) {
  // Find and call handler by request name.
  if (typeof this[request] !== 'function')
    return { error: 'Invalid request' };
  return this[request](data);
}

// Request handlers.
APIHandler.prototype.addDataSource = function(data) {
  var userId = data.userId;

  var newSource = new dataSource({
    owner_id: userId,
    name: data.name,
    url: data.url,
    updated_at : new Date,
    created_at : new Date
  });
  var response = 'asdf';

  return { action: 'addDataSource', response: response };
};

APIHandler.prototype.getDataSources = function(data) {
  var userId = data.userId;
  console.log(userId);

  var response = 'asdf';

  return { action: 'getDataSources', response: response };
};

