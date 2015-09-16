var reportaApp = angular.module('reporta');

reportaApp.controller('recipesController', function($scope, $http) {
  $scope.refreshContents = function() {
    $http({
      method: 'GET',
      url: '/api/getRecipes',
      params: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.recipes = data.message;
    });
  };
  if (!$scope.recipes)
    $scope.refreshContents();
});

reportaApp.controller('recipeTemplateSelectController', function($scope, $http) {
  $scope.refreshContents = function() {
    $http({
      method: 'GET',
      url: '/api/getTemplates',
      params: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.templates = data.message;
    });
  };
  if (!$scope.templates)
    $scope.refreshContents();
});

reportaApp.controller('recipeDataSourceSelectController', function($scope, $http) {
  $scope.refreshContents = function() {
    $http({
      method: 'GET',
      url: '/api/getDataSources',
      params: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.dataSources = data.message;
    });
  };
  if (!$scope.dataSources)
    $scope.refreshContents();
});


reportaApp.controller('recipesButtonController', function($scope, $modal, $location) {
  $scope.openDeleteModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/recipe_delete',
      controller: 'recipesDeleteModalController',
      resolve: {
        recipe: function() {
          return $scope.$parent.recipe;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openCopyModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/recipe_clone',
      controller: 'recipesCloneModalController',
      resolve: {
        recipe: function() {
          return $scope.$parent.recipe;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };

  $scope.editRecipe = function() {
    recipe = $scope.$parent.recipe;
    $location.path("/recipe_editor/" + recipe.name);
  };
});

reportaApp.controller('recipesDeleteModalController', function($scope, $modalInstance, $http, recipe) {
  $scope.recipe = recipe;
  $scope.delete = function() {
    // Call API to update entry in database.
    $http({
      method: 'POST',
      url: '/api/deleteRecipe',
      data: recipe
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close(recipe);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('recipesCloneModalController', function($scope, $modalInstance, $http, recipe) {
  $scope.clone = function() {
    $http({
      method: 'POST',
      url: '/api/addRecipe',
      data: {
        name: $scope.recipe.name,
        data_source_name: recipe.data_source_name,
        template_name: recipe.template_name,
        userId: $scope.user.id,
        content: recipe.content
      }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      location.href='recipes';
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});


reportaApp.controller('recipeEditorController', function($scope, $http, $routeParams) {
  var edit = false;
  var oldTitle = undefined;
  var template = undefined;

  document.getElementById('templateSelect').onchange = function() {
    var e = document.getElementById('recipeEditorForm');
    if (this.value != '')
      e.style.display = 'block';
    else
      e.style.display = 'none';

    $http({
      method: 'POST',
      url: '/api/findTemplate',
      data: {
        userId: $scope.user.id,
        name: $('#templateSelect').val()
      }
    }).success(function(data, status, headers, config) {
      CKEDITOR.instances.recipeEditor.setData(data.content);
    });
  };

  var analytic_type = 'Interrupts';
  var system = undefined;
  var trace = undefined;
  var dataSource = undefined;
  var blah = '';

  document.getElementById('dataSourceSelect').onchange = function() {

    console.log($('#dataSourceSelect').val());

    $http({
      method: 'POST',
      url: '/api/findDataSource',
      data: {
        userId: $scope.user.id,
        name: $('#dataSourceSelect').val()
      }
    }).success(function(data, status, headers, config) {
      dataSource = data.message;
      system = dataSource.system.name;
      trace = dataSource.trace.name;

      $http({
        method: 'POST',
        url: 'api/acertaGetHTML',
        data: { func: 'get_report_form', param: analytic_type + ' ' + system + ' ' + trace}
      }).success(function(data,status,headers,config) {
        console.log(data);
        $("#formDiv").html(data);
      });

    });


    // TODO: need to pull system and trace
  };

  CKEDITOR.replace('recipeEditor',  {
    customConfig : '/ckeditor/config_readonly.js',
    on: {
      instanceReady: function(event) {
        if($routeParams.recipe) {
          edit = true;
          $http({
            method: 'POST',
            url: '/api/findRecipe',
            data: {
              userId: $scope.user.id,
              name: $routeParams.recipe
            }
          }).success(function(data, status, headers, config) {
            oldTitle = data.name;
            document.getElementById('recipeTitle').innerHTML = data.name;

            $('#dataSourceSelect').val(data.data_source_name).change();
            $('#dataSourceSelect').selectpicker('render');

            $('#templateSelect').val(data.template_name).change();
            $('#templateSelect').selectpicker('render');

            event.editor.setData(data.content);

          });
        }
        else {
          $('#dataSourceSelect').selectpicker('refresh');
          $('#templateSelect').selectpicker('refresh');
        }
      },

      change: function(event) {
        $scope.content = event.editor.getData();
      }
    }
  });

  $scope.save = function() {
    if (edit) {
      $http({
        method: 'POST',
        url: '/api/updateRecipe',
        data: {
          userId: $scope.user.id,
          recipe: {
            name: document.getElementById('recipeTitle').innerHTML,
            data_source_name: $(document.getElementById('dataSourceSelect')).val(),
            template_name: $(document.getElementById('templateSelect')).val(),
            content: $scope.content,
            updated_on: new Date()
          },
          oldTitle: oldTitle
        }
      }).success(function(data, status, headers, config) {
        // TODO: Display any errors to the user before closing modal.
        location.href='recipes';
      });
    } else {

      $http({
        method: 'POST',
        url: '/api/addRecipe',
        data: {
          userId: $scope.user.id,
          name: document.getElementById('recipeTitle').innerHTML,
          data_source_name: $(document.getElementById('dataSourceSelect')).val(),
          template_name: $(document.getElementById('templateSelect')).val(),
          content: $scope.content
        }
      }).success(function(data, status, headers, config) {
        // TODO: Display any errors to the user before closing modal.
        location.href='recipes';
      });
    }
  };
});