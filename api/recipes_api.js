module.exports = function(apiHandler) {
  var mongoose = require('mongoose');
  var recipe = mongoose.model('recipe');

  apiHandler.addRecipe = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var newRecipe = new recipe({
      template_name: data.template_name,
      owner_id: data.userId,
      name: data.name,
      content: data.content,
      updated_on: new Date,
      created_on: new Date
    });
    newRecipe.save(function(err) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };

  apiHandler.getRecipes = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    recipe.find({ owner_id: userId }, function(err, recipes) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok", message: recipes };
      res.json(response);
    });
  };

  apiHandler.updateRecipe = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    recipe.findOneAndUpdate({ owner_id: userId, name: data.oldTitle },
        data.recipe, function(err, source) {
      var response;
      if (err)
        response = { status: "error", message: err };
      else
        response = { status: "ok" };
      res.json(response);
    });
  };

  apiHandler.findRecipe = function(res, req) {
    var data = req.method == 'GET' ? req.query : req.body;
    var userId = data.userId;
    var name = data.name;
    recipe.findOne({ owner_id: userId, name: name }, function(err, recipe) {
      res.json(recipe);
    });
  }
};
