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
      $http({
        method: 'POST',
        url: '/api/deleteForms',
        data: {
          recipe_name: recipe.name
        }
      }).success (function(data, status, headers, config) {
        $modalInstance.close(recipe);
      });
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

      // TODO: call cloneForm
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
  var last = undefined;
  var forms = new Array();
  var selections = new Array();

  function saveCurrentForm(editor, callback) {
    if (last != null) {

      var key_id = last.getAttribute('data-id');
      var value = $("#formDiv").html();
      if (value.trim()) {
        forms[key_id] = value;
      }
      forms.data_name = last.getAttribute('data-name');

      // save all form input as json
      var choices = {};

      // TODO: this might fail if acerta has other types of forms
      var inputs = document.getElementById ("formDiv").getElementsByTagName("input");
      for (i = 0; i < inputs.length; i++) {
        // dynamic text fields
        if (inputs[i].id) {
          choices[inputs[i].id] = inputs[i].value;
        }
        // acerta fields
        else if (inputs[i].getAttribute("ng-model")) {
          choices[inputs[i].getAttribute("ng-model")] = inputs[i].value;
        }
      }

      var selects = document.getElementById("formDiv").getElementsByTagName("select");
      for (i = 0; i < selects.length; i++) {
        // hidden fields don't have ids
        if(selects[i].id) {
          var multiselects = [];
          for (j = 0; j < selects[i].selectedOptions.length; j++) {
            if (selects[i].selectedOptions[j].label != "")
              multiselects.push(selects[i].selectedOptions[j].label);
          }
          choices[selects[i].id] = multiselects;
        }
      }
      var choices_to_string = JSON.stringify(choices);
      selections[key_id] = choices_to_string;
    }

    // find next element after we finish saving
    if (callback != null)
      callback();
  };

  function loadCurrentSelection(selections) {
    if (selections == null)
      return;

    var selection_list = JSON.parse(selections);

    var inputs = document.getElementById ("formDiv").getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
      // hidden fields don't have ids
      if (inputs[i].id) {
        inputs[i].value = selection_list[inputs[i].id];
      }
      // acerta fields
      else {
        inputs[i].value = selection_list[inputs[i].getAttribute("ng-model")];
      }
    }

    var selects = document.getElementById("formDiv").getElementsByTagName("select");
    for (i = 0; i < selects.length; i++) {
      // hidden fields don't have ids
      var key = selects[i].id
      if(key) {
        for (j = 0; j < selects[i].options.length; j++) {
          // for each option in a multi-select, check if it was previously recorded in selection_list[key]
          if (selection_list[key].indexOf (selects[i].options[j].label) >= 0) {
            selects[i].options[j].selected = true;
          }
        }
      }
    }

  };

  document.getElementById('templateSelect').onchange = function() {
    forms = {};
    selections = {};
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

  document.getElementById('dataSourceSelect').onchange = function() {
    forms = {};
    selections = {};
    $http({
      method: 'POST',
      url: '/api/findDataSource',
      data: {
        userId: $scope.user.id,
        name: $('#dataSourceSelect').val()
      }
    }).success(function(data, status, headers, config) {
      dataSource = data.message;
    });

  };

  CKEDITOR.replace('recipeEditor',  {
    customConfig : '/ckeditor/config_readonly.js',
    on: {
      key: function(event) {
        // enable only direction arrow keys
        if (event.data.keyCode < 37 || event.data.keyCode > 40) {
          event.cancel();
        }
      },

      contentDom: function (event) {
        if (!event.editor.document)
          return;
        var analyses = event.editor.document.getElementsByTag("img");
        for (var i = 0; i < analyses.count(); i++) {
          analyses.getItem(i).on('click', function(ev){
            event.editor.execCommand('findcurrent'); // add getform command to analysis
          });
        }
      },

      instanceReady: function(event) {

        var editor = event.editor;
        var remove_commands = ['contextMenu','image', 'cut', 'copy', 'paste', 'preview',
        'arrivalCurve', 'cooccurrence', 'densityMap', 'errorAnalytics', 'fiveNumberSummary',
        'followedBy', 'frequencyHeatmap', 'iffCooccurrence', 'interruptAnalytics',
        'markovModel', 'messagingAnalytics', 'precededBy', 'processStateAnalytics',
        'regularityHeatmap', 'singlePeriod'];

        // disable command actions
        for (var i = 0; i < remove_commands.length; i++) {
           editor.commands[remove_commands[i]].setState(CKEDITOR.TRISTATE_DISABLED);
        }

        // clear the right click menu
        var remove_menu_commands = ['copy', 'cut', 'paste'];
        for (var i = 0; i < remove_menu_commands.length; i++) {
          editor.removeMenuItem(remove_menu_commands[i]);
        }

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
      },

      findElementEvent: function(event) {
        saveCurrentForm(event.editor, function () {
          last = event.editor.getSelection().getStartElement();

          $http({
            method: 'POST',
            url: '/api/findDataSource',
            data: {
              userId: $scope.user.id,
              name: $('#dataSourceSelect').val()
            }
          }).success(function(data, status, headers, config) {
            // try to find existing form in memory, then in db, finally from acerta
            var key_id = event.editor.getSelection().getStartElement().getAttribute('data-id');
            // load from mem
            if (forms[key_id] != null)
            {
                $("#formDiv").html(forms[key_id]);
                loadCurrentSelection(selections[key_id]);
            }
            else {
              $http({
                method: 'POST',
                url: 'api/findForm',
                data: {
                  recipe_name: $(document.getElementById('recipeTitle')).text(),
                  template_name: $(document.getElementById('templateSelect')).val(),
                  userId: $scope.user.id,
                  name: key_id
                }
              }).success(function(data_db,status,headers,config) {
                if (data_db != null) {
                  $("#formDiv").html(data_db.form);
                  loadCurrentSelection(data_db.selections);
                }
                else if (event.data == 'dynamicText') {
                  // if dynamic text
                  var form = "<form name=\"" + key_id + "\" >\n  Endpoint:<br>\n  <input id=\"endpoint\" type=\"text\" name=\"endpoint\" value=\"api/mockDataJSON\">\n  <br>\n  Property Name:<br>\n  <input id=\"propertyName\" type=\"text\" name=\"propertyName\">\n</form>";
                  $("#formDiv").html(form);
                }
                else {
                  // no record in memory or db, pull from acerta
                  // TODO: if failed to read, don't save last form

                  // if analytic construct arg list
                  var dataSource = data.message;
                  var dataType = event.data;
                  var system = dataSource.system.name;
                  var params = dataType + ' ' + system
                  for (i = 0; i < dataSource.trace.length; i++) {
                    params += ' ' + dataSource.trace[i].name;
                  }
                  console.log(params)

                  $http({
                  method: 'POST',
                  url: 'api/acertaGetHTML',
                  data: {
                    func: 'get_report_form',
                    param: params
                  }
                  }).success(function(data_acerta,status,headers,config) {
                    if (data_acerta != "error") {
                      $("#formDiv").html(data_acerta);
                    }
                    else {
                      $http({
                        method: 'get',
                        url: 'http://127.0.0.1:3000/api/mockForm',
                        params: { param: dataType }
                      }).success(function(data_mock, status, headers, config) {
                        $("#formDiv").html(data_mock.message);
                        console.log("using mock form");
                        loadCurrentSelection(selections[key_id]);
                      });
                    }
                  });
                }
              });
            }
          });
        });
      }
    }
  });

  $scope.save = function() {
    saveCurrentForm(CKEDITOR.instances.recipeEditor);
    // save all forms
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
    for (var key in forms){
      $http({
        method: 'POST',
        url: '/api/addForm',
        data: {
          recipe_name: $(document.getElementById('recipeTitle')).text(),
          userId: $scope.user.id,
          data_source_name: $(document.getElementById('dataSourceSelect')).val(),
          template_name: $(document.getElementById('templateSelect')).val(),
          name: key,
          form: forms[key],
          selections: selections[key]
        }
      }).success(function(data, status, headers, config) {
        // TODO: Display any errors to the user before closing modal.
      });
    }
  };
});