module.exports = function(apiHandler) {
  var mongoose = require('mongoose');
  var dataSet = mongoose.model('dataSet');

  apiHandler.addDataSet = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    console.log(data);
    var newSet = new dataSet({
      owner_id: userId,
      name: data.name,
      source_name: data.sourceName,
      properties: data.properties,
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

  apiHandler.getDataSets = function(res, req) {
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

  apiHandler.updateDataSet = function(res, req) {
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

  apiHandler.deleteDataSet = function(res, req) {
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
};
