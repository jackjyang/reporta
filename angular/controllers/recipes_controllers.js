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

reportaApp.controller('recipesButtonController', function($scope, $modal, $location) {
  $scope.openDeleteModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/template_delete',
      controller: 'templatesDeleteModalController',
      resolve: {
        template: function() {
          return $scope.$parent.template;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openCopyModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/template_clone',
      controller: 'templatesCloneModalController',
      resolve: {
        template: function() {
          return $scope.$parent.template;
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
        name: $('.selectpicker').val()
      }
    }).success(function(data, status, headers, config) {
      CKEDITOR.instances.recipeEditor.setData(data.content);
    });


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

            $('.selectpicker').val(data.template_name).change();
            $('.selectpicker').selectpicker('render');

            event.editor.setData(data.content);

          });
        }
        else {
          $('.selectpicker').selectpicker('refresh');
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