var reportaApp = angular.module('reporta');

reportaApp.controller('templatesController', function($scope, $http) {
  $scope.refreshContents = function() {
    // $http({
    //   method: 'GET',
    //   url: '/api/getTemplates',
    //   params: { userId: $scope.user.id }
    // }).success(function(data, status, headers, config) {
    //   data.message.forEach(function(elem) {
    //     elem.updated_on = new Date(elem.updated_on);
    //     elem.created_on = new Date(elem.created_on);
    //   });
    //   $scope.templates = data.message;
    // });
    $scope.templates = [
      {_id: 1, name: 'test1' },
      {_id: 2, name: 'test2' },
      {_id: 3, name: 'test3' },
    ];
    console.log($scope.templates);
  };
  if (!$scope.templates)
    $scope.refreshContents();
});

reportaApp.controller('templatesButtonController', function($scope, $modal) {
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
});

reportaApp.controller('templatesDeleteModalController', function($scope, $modalInstance, $http, template) {
  $scope.template = template;
  $scope.delete = function() {
    // Call API to update entry in database.
    $http({
      method: 'POST',
      url: '/api/deleteTemplate',
      data: { source }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close(source);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('templateEditorController', function($scope, $http) {
  CKEDITOR.replace('templateEditor', {
    on: {
      instanceReady: function(event) {

      },
      change: function(event) {
        $scope.content = event.editor.getData();
      }
    }
  });

  $scope.save = function() {
    template = {userId: '', name: '', content:''};
    template.userId = $scope.user.id;
    template.name = document.getElementById('title').innerHTML;
    template.content = $scope.content;
    $http({
      method: 'POST',
      url: '/api/addTemplate',
      data: { template }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      location.href='templates';
    });
  };
});
