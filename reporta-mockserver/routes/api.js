var apiHandler = new APIHandler();
exports.handler = function(req, res) {
  // Express routing for REST API.
  apiHandler.handleRequest(res, req.params.request, req);
};

function APIHandler() {
  this.handleRequest = function(res, request, req) {
    // Find and call handler by request name.
    if (typeof this[request] !== 'function')
      res.json({ error: 'Invalid request' });
    else
      this[request](res, req);
  }
}

// Include specific request handlers.
require('../api/mock_api.js')(apiHandler);