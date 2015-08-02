// Express routing for REST API.
exports.handler = function(req, res) {
  var param = JSON.parse(req.params.data);
  res.json(APIHandler(param.action, param.data));
};

var mongoose = require('mongoose');
var template = mongoose.model('template');

// Handler for specific API actions.
function APIHandler(action, data) {
  addTemplate = function(data) {
  };

  listTemplates = function(data) {
  };

  if (typeof this[action] !== 'function')
    return { error: 'Invalid action' };
  return this[action](data);
}
