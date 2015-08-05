var mongoose = require('mongoose');
var dataSource = mongoose.model('dataSource');
var template = mongoose.model('template');
var dataSet = mongoose.model('dataSet');

var apiHandler = new APIHandler();
exports.handler = function(req, res) {
  // Express routing for REST API.
  apiHandler.handleRequest(res, req.params.request, req);
};

function APIHandler() {
  // Empty constructor.
}

APIHandler.prototype.handleRequest = function(res, request, req) {
  // Find and call handler by request name.
  if (typeof this[request] !== 'function')
    res.json({ error: 'Invalid request' });
  else
    this[request](res, req);
}

// Request handlers.
APIHandler.prototype.addDataSource = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  var newSource = new dataSource({
    owner_id: userId,
    name: data.name,
    url: data.url,
    updated_on: new Date,
    created_on: new Date
  });
  newSource.save(function(err) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok" };
    res.json(response);
  });
};

APIHandler.prototype.getDataSources = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  dataSource.find({ owner_id: userId }, function(err, dataSources) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok", message: dataSources };
    res.json(response);
  });
};

APIHandler.prototype.updateDataSource = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  dataSource.findOneAndUpdate({ owner_id: userId, name: data.oldSource.name },
      data.source, function(err, source) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok" };
    res.json(response);
  });
};

APIHandler.prototype.deleteDataSource = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  dataSource.remove(data.source, function(err, source) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok" };
    res.json(response);
  });
};

APIHandler.prototype.generateReportWithData = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  console.log(data);
  res.json({ status: "ok" });
};

APIHandler.prototype.addDataSet = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  var newSet = new dataSet({
    owner_id: userId,
    name: data.name,
    data_set: data.dataSet,
    updated_on: new Date,
    created_on: new Date
  });
  newSet.save(function(err) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok" };
    res.json(response);
  });
};

APIHandler.prototype.getDataSets = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  dataSet.find({ owner_id: userId }, function(err, dataSets) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok", message: dataSets };
    res.json(response);
  });
};

APIHandler.prototype.updateDataSet = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  dataSet.findOneAndUpdate({ owner_id: userId, name: data.oldSource.name },
      data.source, function(err, set) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok" };
    res.json(response);
  });
};

APIHandler.prototype.deleteDataSet = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var userId = data.userId;
  dataSet.remove(data.source, function(err, set) {
    var response;
    if (err)
      response = { status: "error", message: err };
    else
      response = { status: "ok" };
    res.json(response);
  });
};