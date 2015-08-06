var mongoose = require('mongoose');
var template = mongoose.model('template');
var dataSet = mongoose.model('dataSet');

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

apiHandler.test = function(res, req) {
  res.json({
    prop1: 'val1',
    prop2: 2345,
    obj: {
        a: 'a',
        b: 'b',
        c: {
          a: 'a',
          b: 'b',
          c: {
            a: 'a',
            b: 'b',
            c: 'c'
          }
        }
    },
    list: [{
        subprop: 'sub1'
    }, {
        subprop: 'sub2'
    }],
    emptylist: [],
    emptyObj: {},
    obj2: {
        a: 'a',
        b: 'b',
        c: {
          a: 'a',
          b: 'b',
          c: {
            a: 'a',
            b: 'b',
            c: 'c'
          }
        }
    },
  });
}

// Include specific request handlers.
require('../api/data_sources_api.js')(apiHandler);
require('../api/data_sets_api.js')(apiHandler);
require('../api/templates_api.js')(apiHandler);
