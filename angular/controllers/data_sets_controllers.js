var reportaApp = angular.module('reporta');

reportaApp.controller('dataSetsController', function($scope, $http) {
  $scope.refreshContents = function() {
    // $http({
    //   method: 'GET',
    //   url: '/api/getDataSets',
    //   params: { userId: $scope.user.id }
    // }).success(function(data, status, headers, config) {
    //   data.message.forEach(function(elem) {
    //     elem.updated_on = new Date(elem.updated_on);
    //     elem.created_on = new Date(elem.created_on);
    //   });
    //   $scope.dataSets = data.message;
    // });
    $scope.dataSets = [
      {_id: 1, name: 'test1', updated_on: new Date() },
      {_id: 2, name: 'test2', updated_on: new Date() },
      {_id: 3, name: 'test3', updated_on: new Date() },
    ];
  }
  if (!$scope.dataSets)
    $scope.refreshContents();
});

reportaApp.controller('dataSetsButtonController', function($scope, $modal) {
  $scope.openNewModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_set_new',
      controller: 'dataSetNewModalController',
      resolve: {
        dataSet: function() {
          return undefined;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openCloneModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_set_new',
      controller: 'dataSetNewModalController',
      resolve: {
        dataSet: function() {
          return $scope.$parent.dataSet;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openEditModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_set_edit',
      controller: 'dataSetEditModalController',
      resolve: {
        dataSet: function() {
          return Object.create($scope.$parent.dataSet); // Deep copy of set.
        }
      }
    });
    modalInstance.result.then(function(dataSet) {
      $scope.$parent.dataSet = dataSet;
    });
  };

  $scope.openDeleteModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_set_delete',
      controller: 'dataSetDeleteModalController',
      resolve: {
        dataSet: function() {
          return $scope.$parent.dataSet;
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };
});

reportaApp.controller('dataSetNewModalController', function($scope, $modalInstance, $http, dataSet) {
  // Pre-fill data if given, when cloning.
  if (dataSet)
    $scope.dataSet = { url: dataSet.url };
  $scope.save = function() {
    $scope.set.userId = $scope.user.id;
    $http({
      method: 'POST',
      url: '/api/addDataSet',
      data: $scope.dataSet
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close($scope.dataSet);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('dataSetEditModalController', function($scope, $modalInstance, $http, dataSet) {
  $scope.dataSet = dataSet;
  $scope.oldSetName = dataSet.name;
  $scope.save = function() {
    dataSet.updated_on = new Date();

    // Call API to update entry in database.
    $http({
      method: 'POST',
      url: '/api/updateDataSet',
      data: {
        userId: $scope.user.id,
        oldSet: { name: $scope.oldSetName },
        dataSet: dataSet
      }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close($scope.dataSet);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('dataSetDeleteModalController', function($scope, $modalInstance, $http, dataSet) {
  $scope.delete = function() {
    // Call API to update entry in database.
    $http({
      method: 'POST',
      url: '/api/deleteDataSet',
      data: dataSet
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close(dataSet);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
