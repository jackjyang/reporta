var mongoose = require('mongoose');
var dataSource = mongoose.model('dataSource');
var template = mongoose.model('template');

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

var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var PhantomPDF = require('phantom-pdf');
function guid() { // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
APIHandler.prototype.generateReportWithDataHTML = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var uniqueId = guid();
  var templateData = JSON.parse(req.body.data);
  console.log(templateData);

  fs.readFile(path.join(__dirname, '../tmp/pg4.hbs'), 'utf8', function (err, data) {

    var template = Handlebars.compile(data);
    var result = template(templateData);
    var resultFile = path.join(__dirname, '../tmp/' + uniqueId + '.html');
    fs.writeFile(resultFile, result, function(err) {
      if (err)
      console.log(err);
      res.download(resultFile, resultFile, function(err) {
        fs.unlinkSync(resultFile);
      });
    });
  });
};

APIHandler.prototype.generateReportWithDataPDF = function(res, req) {
  var data = req.method == 'GET' ? req.query : req.body;
  var uniqueId = guid();
  var templateData = JSON.parse(req.body.data);
  console.log(templateData);

  fs.readFile(path.join(__dirname, '../tmp/pg4.hbs'), 'utf8', function (err, data) {

    var template = Handlebars.compile(data);
    var result = template(templateData);
    var resultFile = path.join(__dirname, '../tmp/' + uniqueId + '.html');
    fs.writeFile(resultFile, result, function(err) {
      if (err)
        console.log(err);

        phantom.create(function (ph) {
          ph.createPage(function (page) {
            page.set('paperSize', {
              format: 'A4'
            }, function() {
              page.open(resultFile, function start(status) {

                page.render(resultFile + '.pdf', {format: 'pdf', quality: '100'}, function() {
                  res.download(resultFile + '.pdf', resultFile + '.pdf', function(err) {
                    fs.unlinkSync(resultFile);
                    fs.unlinkSync(resultFile + '.pdf');
                  });
                });
              });
            });

        });
      });
    });
  });
};
