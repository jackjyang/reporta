var reportaApp = angular.module('reporta');

function createTreeViewData(obj, prefix, parentIsArray) {
  var result = { children: [ ] };
  if (!prefix)
    prefix = '';
  else
    prefix = prefix + '_';

  for (var p in obj) {
    if (obj[p] instanceof Array) {
      var subResult = createTreeViewData(obj[p], prefix + p, true);
      subResult.property = p;
      if (subResult.children.length > 0) {
        result.children.push({
          id: prefix + p,
          property: p,
          children: [ subResult.children[0] ],
          type: 'array'
        });
      }
    } else if (typeof obj[p] === 'object') {
      var subResult = createTreeViewData(obj[p], prefix + p, false);
      subResult.property = p;
      if (subResult.children.length > 0) {
        result.children.push({
          id: prefix + p,
          property: p,
          children: subResult.children,
          type: 'object'
        });
      }
    } else {
      result.children.push({
        id: prefix + p,
        property: p,
        type: typeof obj[p]
      });
    }
  }
  if (parentIsArray && result.children[0]) {
    result = result.children[0];
  }
  return result;
}

reportaApp.controller('dataSetsController', function($scope, $http) {
  $scope.refreshContents = function() {
    $http({
      method: 'GET',
      url: '/api/getDataSets',
      params: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
        elem.propertiesList = Object.keys(elem.properties);
      });
      $scope.dataSets = data.message;
    });
  };

  // Get list of data sources. No need to refresh this throughout the
  // lifetime of this controller.
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
    // Generate properties for each source.
    for (var i = 0; i < $scope.dataSources.length; i++) {
      var source = $scope.dataSources[i];
      $http({
        method: 'GET',
        url: source.url
      }).success((function(source) {
        return function(data, status, headers, config) {
          if (typeof data == 'object')
            source.data = data;
        }
      })(source));
    }
  });

  if (!$scope.dataSets)
    $scope.refreshContents();
});

reportaApp.controller('dataSetsButtonController', function($scope, $modal) {
  $scope.openNewModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_set_new',
      controller: 'dataSetNewModalController',
      resolve: {
        dataSources: function() {
          return $scope.dataSources;
        },
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

reportaApp.controller('dataSetNewModalController',
    function($scope, $modalInstance, $http, dataSources, dataSet) {

  $scope.dataSources = dataSources;
  $scope.dataSet = {};
  $scope.dataSet.sourceName = 'Select a Source';

  // Pre-fill data if given, when cloning.
  if (dataSet)
    $scope.dataSet = { url: dataSet.url };

  $scope.selectSource = function(sourceName) {
    $scope.dataSet.properties = {};
    $scope.dataSet.sourceName = sourceName;

    // Find the actual data source object from the array.
    var getSource = function(name) {
      for (var i = 0; i < dataSources.length; i++)
        if (dataSources[i].name == name)
          return dataSources[i];
    };
    if (getSource(sourceName).data) {
      $scope.selectedSourceData = JSON.stringify(getSource(sourceName).data);
      $scope.treeViewData = createTreeViewData(getSource(sourceName).data);
    } else {
      $scope.selectedSourceData = undefined;
      $scope.treeViewData = undefined;
    }
  };
  $scope.toggleCheckBox = function(checkboxId) {
    var traverseAndSetValue = function(elem, value) {
      if (elem.tagName == 'INPUT') {
        if (value)
          $scope.dataSet.properties[elem.id] = value;
        else
          delete $scope.dataSet.properties[elem.id];
      }
      for (var i = 0; i < elem.childNodes.length; i++)
        traverseAndSetValue(elem.childNodes[i], value);
    };

    var checkbox = document.getElementById(checkboxId);
    var value = $scope.dataSet.properties[checkboxId];
    traverseAndSetValue(checkbox.parentNode.parentNode, value);
  };
  $scope.save = function() {
    $scope.dataSet.userId = $scope.user.id;
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
    console.log($scope.checkbox);
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
