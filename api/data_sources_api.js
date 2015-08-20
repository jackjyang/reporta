module.exports = function(apiHandler) {
  var mongoose = require('mongoose');
  var dataSource = mongoose.model('dataSource');

  apiHandler.addDataSource = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    var newSource = new dataSource({
      owner_id: userId,
      name: data.name,
      system: data.system,
      trace: data.trace,
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

  apiHandler.getDataSources = function(res, req) {
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

  apiHandler.updateDataSource = function(res, req) {
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

  apiHandler.deleteDataSource = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    dataSource.remove(data, function(err, source) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };
};
