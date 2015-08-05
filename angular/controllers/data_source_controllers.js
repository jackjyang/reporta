var reportaApp = angular.module('reporta');

reportaApp.controller('dataSourcesController', function($scope, $http) {
  $scope.refreshContents = function() {
    $http({
      method: 'post',
      url: '/api/getDataSources',
      data: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.dataSources = data.message;
    });
  }
  if (!$scope.dataSources)
    $scope.refreshContents();
});

reportaApp.controller('dataSourceButtonController', function($scope, $modal) {
  $scope.openNewModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_source_new',
      controller: 'dataSourceNewModalController',
      resolve: {
        source: function() {
          return undefined;
        }
      }
    });
    modalInstance.result.then(function(source) {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openCloneModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_source_new',
      controller: 'dataSourceNewModalController',
      resolve: {
        source: function() {
          return $scope.$parent.source;
        }
      }
    });
    modalInstance.result.then(function(source) {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openEditModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_source_edit',
      controller: 'dataSourceEditModalController',
      resolve: {
        source: function() {
          return Object.create($scope.$parent.source); // Deep copy of source.
        }
      }
    });
    modalInstance.result.then(function(source) {
      $scope.$parent.source = source;
    });
  };

  $scope.openDeleteModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_source_delete',
      controller: 'dataSourceDeleteModalController',
      resolve: {
        source: function() {
          return $scope.$parent.source;
        }
      }
    });
    modalInstance.result.then(function(source) {
      $scope.$parent.refreshContents();
    });
  };
});

reportaApp.controller('dataSourceNewModalController', function($scope, $modalInstance, $http, source) {
  // Pre-fill data if given, when cloning.
  if (source)
    $scope.source = { url: source.url };
  $scope.save = function() {
    $scope.source.userId = $scope.user.id;
    $http({
      method: 'POST',
      url: '/api/addDataSource',
      data: $scope.source
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close(source);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('dataSourceEditModalController', function($scope, $modalInstance, $http, source) {
  $scope.source = source;
  $scope.oldSourceName = source.name;
  $scope.save = function() {
    source.updated_on = new Date();

    // Call API to update entry in database.
    $http({
      method: 'POST',
      url: '/api/updateDataSource',
      data: {
        userId: $scope.user.id,
        oldSource: { name: $scope.oldSourceName },
        source: source
      }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close($scope.source);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('dataSourceDeleteModalController', function($scope, $modalInstance, $http, source) {
  $scope.delete = function() {
    // Call API to update entry in database.
    $http({
      method: 'POST',
      url: '/api/deleteDataSource',
      data: source
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close(source);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
