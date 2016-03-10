var reportaApp = angular.module('reporta');
var counter;

reportaApp.controller('templatesController', function($scope, $http) {
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

reportaApp.controller('templatesButtonController', function($scope, $modal, $location) {
  $scope.openDeleteModal = function() {
    console.log($scope.$parent.template);
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

  $scope.editTemplate = function() {
    template = $scope.$parent.template;
    $location.path("/template_editor/" + template.name);
  };
});

reportaApp.controller('templatesDeleteModalController', function($scope, $modalInstance, $http, template) {
  $scope.template = template;
  $scope.delete = function() {
    // Call API to update entry in database.
    $http({
      method: 'POST',
      url: '/api/deleteTemplate',
      data: { template }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close(template);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('templatesCloneModalController', function($scope, $modalInstance, $http, template) {
  $scope.clone = function() {
    $http({
      method: 'POST',
      url: '/api/addTemplate',
      data: {
        userId: $scope.user.id,
        name: $scope.template.name,
        content: template.content
      }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      location.href='templates';
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('templateEditorController', function($scope, $http, $routeParams) {
  var edit = false;
  var oldTitle = undefined;

  $http({
    method: 'GET',
    url: '/api/getCounter'
  }).success(function(data, status, headers, config) {
    counter = Number(data);
  });

  CKEDITOR.replace('templateEditor', {
    on: {
      instanceReady: function(event) {
        if($routeParams.template) {
          edit = true;
          $http({
            method: 'POST',
            url: '/api/findTemplate',
            data: {
              userId: $scope.user.id,
              name: $routeParams.template
            }
          }).success(function(data, status, headers, config) {
            oldTitle = data.name;
            document.getElementById('title').innerHTML = data.name;
            event.editor.setData(data.content);
            CKEDITOR.config.customConfig.valueOf['headerValue'] = data.header;
          });
        }
      },
      change: function(event) {
        $scope.content = event.editor.getData();
      }
    }
  });

  $scope.save = function() {
    $http({
      method: 'POST',
      url: '/api/saveCounter',
      data: { value: Number(counter) }
    }).success(function(data, status, headers, config) {
      // Find something to do if error/successful?
    });
    var pageNumber = false;
    if($('.cke_button__pagenumber').hasClass('cke_button_on')) {
      pageNumber = true;
    }
    if (edit) {
      $http({
        method: 'POST',
        url: '/api/updateTemplate',
        data: {
          userId: $scope.user.id,
          template: {
            name: document.getElementById('title').innerHTML,
            content: $scope.content,
            updated_on: new Date(),
            page_numbers: pageNumber,
            header: CKEDITOR.config.customConfig.valueOf['headerValue']
          },
          oldTitle: oldTitle
        }
      }).success(function(data, status, headers, config) {
        // TODO: Display any errors to the user before closing modal.
        location.href='templates';
      });
    } else {
      $http({
        method: 'POST',
        url: '/api/addTemplate',
        data: {
          userId: $scope.user.id,
          name: document.getElementById('title').innerHTML,
          content: $scope.content,
          page_numbers: pageNumber,
          header: CKEDITOR.config.customConfig.valueOf['headerValue']
        }
      }).success(function(data, status, headers, config) {
        // TODO: Display any errors to the user before closing modal.
        location.href='templates';
      });
    }
  };
});
