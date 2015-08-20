module.exports = function(apiHandler) {
  var mongoose = require('mongoose');
  // var dataSet = mongoose.model('dataSet');

  apiHandler.addDataSet = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.set.userId;
    console.log(data);
    var newSet = new dataSet({
      owner_id: userId,
      name: data.set.name,
      source_name: data.set.sourceName,
      properties: data.set.properties,
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
    var userId = data.set.userId;
    data.set.updated_on = new Date();
    dataSet.findOneAndUpdate({ owner_id: userId, name: data.oldName },
        data.set, function(err, set) {
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
    dataSet.remove({ owner_id: data.owner_id, name: data.name }, function(err, set) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };
};
