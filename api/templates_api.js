module.exports = function(apiHandler) {
  var mongoose = require('mongoose');
  var template = mongoose.model('template');

  apiHandler.addTemplate = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    var newTemplate = new template({
      owner_id: userId,
      name: data.name,
      content: data.content,
      updated_on: new Date,
      created_on: new Date
    });
    newTemplate.save(function(err) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };

  apiHandler.addTemplate = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    var newTemplate = new template({
      owner_id: userId,
      name: data.name,
      content: data.content,
      updated_on: new Date,
      created_on: new Date
    });
    newTemplate.save(function(err) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };

  apiHandler.getTemplates = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    template.find({ owner_id: userId }, function(err, templates) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok", message: templates };
      res.json(response);
    });
  };

  apiHandler.updateTemplate = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    template.findOneAndUpdate({ owner_id: userId, name: data.oldTitle },
        data.template, function(err, source) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };

  apiHandler.findTemplate = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    var name = data.name;
    template.findOne({ owner_id: userId, name: name }, function(err, template) {
      res.json(template);
    });
  }
};
