module.exports = function(apiHandler) {
  var mongoose = require('mongoose');
  var template = mongoose.model('template');
  var counter = mongoose.model('counter');

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

  apiHandler.deleteTemplate = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    console.log(data);
    template.remove({_id: data.template._id}, function(err, source) {
      var response;
      if (err) {
        response = { status: "error", message: err };
      } else {
        response = { status: "ok" };
      }
      res.json(response);
    });
  };

  apiHandler.getCounter = function(res, req) {
    counter.findOne({id: 1}, 'value', function(err, counter) {
      res.json(counter.toObject().value);
    });
  };

  apiHandler.saveCounter = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    console.log('new counter value = ' + data.value);
    counter.update({ id: 1 }, { value: data.value }, function(err, counter) {
      var repsonse;
      if (err) {
        response = { status: "error", message: err };
      } else {
        response = { status: "ok" };
      }
      res.json(repsonse);
    });
  };
};
