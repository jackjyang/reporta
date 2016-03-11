module.exports = function(apiHandler) {
  var mongoose = require('mongoose');
  var form = mongoose.model('form');

  apiHandler.addForm = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    var newForm = new form({
      recipe_name: data.recipe_name,
      template_name: data.template_name,
      owner_id: data.userId,
      name: data.name,
      form: data.form,
      selections: data.selections,
      updated_on: new Date,
      created_on: new Date
    });
    form.update(
      {
        recipe_name: newForm.recipe_name,
        template_name: newForm.template_name,
        owner_id: newForm.owner_id,
        name: newForm.name
      },
      newForm,
      {upsert: true},
      function(err) {
        var response;
        if (err)
          response = { status: "error", message: err };
        else
          response = { status: "ok" };
        res.json(response);
      }
    );
  }

  apiHandler.findForm = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var recipe_name = data.recipe_name;
    var template_name = data.template_name;
    var userId = data.userId;
    var name = data.name;
    form.findOne(
    {
      recipe_name:recipe_name,
      template_name: template_name,
      owner_id: userId,
      name:name
    }, function(err, form) {
      res.json(form);
    });
  };

  apiHandler.updateForm = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var recipe_name = data.recipe_name;
    var template_name = data.template_name;
    var userId = data.userId;
    var name = data.name;
    form.findOneAndUpdate(
    {
      recipe_name: recipe_name,
      template_name: template_name,
      owner_id: userId,
      name: name
    },
    data.form, data.selections, function(err, source) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };

  apiHandler.deleteForms = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var recipe_name = data.recipe_name;
    form.find({recipe_name: recipe_name}).remove(function(err, source) {
      var response;
      if (err)
        response = { status: "error", message: err};
      else
        response = { status: "ok"};
      res.json(response);
    });
  }

  // TODO: add clone form api
};
