// Express routing for REST API.
exports.handler = function(req, res) {
  res.json(APIHandler(req.params.action, JSON.parse(req.params.data)));
};

// Handler for specific API actions.
var mongoose = require('mongoose');
var template = mongoose.model('template');

function APIHandler(action, data) {
  addTemplate = function(data) {
  };

  listTemplates = function(data) {
  };

  if (typeof this[action] !== 'function')
    return { error: 'Invalid action' };
  return this[action](data);
}
