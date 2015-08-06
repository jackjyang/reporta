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
        elem.sourceName = elem.source_name;
        if (elem.properties)
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
      templateUrl: 'modals/data_set_editor',
      controller: 'dataSetEditorModalController',
      resolve: {
        dataSources: function() {
          return $scope.dataSources;
        },
        dataSet: function() {
          return undefined;
        },
        title: function() {
          return 'Create Data Set';
        },
        apiUrl: function() {
          return 'api/addDataSet';
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openCloneModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_set_editor',
      controller: 'dataSetEditorModalController',
      resolve: {
        dataSources: function() {
          return $scope.dataSources;
        },
        dataSet: function() {
          var set = Object.create($scope.dataSet);
          set.name = '';
          return set;
        },
        title: function() {
          return 'Clone Data Set';
        },
        apiUrl: function() {
          return 'api/addDataSet';
        }
      }
    });
    modalInstance.result.then(function() {
      $scope.$parent.refreshContents();
    });
  };

  $scope.openEditModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_set_editor',
      controller: 'dataSetEditorModalController',
      resolve: {
        dataSources: function() {
          return $scope.dataSources;
        },
        dataSet: function() {
          return $scope.dataSet;
        },
        title: function() {
          return 'Edit Data Set';
        },
        apiUrl: function() {
          return 'api/updateDataSet';
        }
      }
    });
    modalInstance.result.then(function(dataSet) {
      $scope.$parent.dataSet = dataSet;
      $scope.$parent.dataSet.updated_on = new Date();
      if (dataSet.properties)
        $scope.$parent.dataSet.propertiesList = Object.keys(dataSet.properties);
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

reportaApp.controller('dataSetEditorModalController',
    function($scope, $modalInstance, $http, dataSources, dataSet, title, apiUrl) {

  $scope.dataSources = dataSources;
  $scope.dataSet = {};
  $scope.dataSet.sourceName = 'Select a Source';

  $scope.title = title;

  $scope.selectSource = function(sourceName) {
    $scope.dataSet.properties = {};
    $scope.dataSet.sourceName = sourceName;

    // Find the actual data source object from the array.
    var getSource = function(name) {
      for (var i = 0; i < dataSources.length; i++)
        if (dataSources[i].name == name)
          return dataSources[i];
    };
    console.log(sourceName);
    if (getSource(sourceName).data) {
      $scope.selectedSourceData = JSON.stringify(getSource(sourceName).data);
      $scope.treeViewData = createTreeViewData(getSource(sourceName).data);
    } else {
      $scope.selectedSourceData = undefined;
      $scope.treeViewData = undefined;
    }
  };
  $scope.toggleCheckBox = function(checkboxId) {
    var traverseAndSetValueDown = function(elem, value) {
      if (elem.tagName == 'INPUT') {
        if (value)
          $scope.dataSet.properties[elem.id] = value;
        else
          delete $scope.dataSet.properties[elem.id];
      }
      for (var i = 0; i < elem.childNodes.length; i++)
        traverseAndSetValueDown(elem.childNodes[i], value);
    };

    var checkbox = document.getElementById(checkboxId);
    var value = $scope.dataSet.properties[checkboxId];
    traverseAndSetValueDown(checkbox.parentNode.parentNode, value);

    // Also traverse upwards.
    var elem = checkbox;
    while (elem.parentNode) {
      if (elem.tagName == 'LI') {
        var check = elem.childNodes[1].childNodes[1];
        if (value)
          $scope.dataSet.properties[check.id] = value;
        else
          delete $scope.dataSet.properties[check.id];
      }
      elem = elem.parentNode;
    }
  };

  $scope.save = function() {
    $scope.dataSet.userId = $scope.user.id;
    $http({
      method: 'POST',
      url: apiUrl,
      data: { set: $scope.dataSet, oldName: $scope.originalDataSetName }
    }).success(function(data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close($scope.dataSet);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  // Pre-fill data if given.
  if (dataSet) {
    console.log(dataSet);
    $scope.dataSet = {
      name: dataSet.name,
      sourceName: dataSet.sourceName,
      created_on: dataSet.created_on,
      updated_on: dataSet.updated_on
    };
    console.log(dataSet.sourceName);
    $scope.selectSource(dataSet.sourceName);
    $scope.dataSet.properties = dataSet.properties;
    $scope.originalDataSetName = dataSet.name;
  }
});

reportaApp.controller('dataSetDeleteModalController', function($scope, $modalInstance, $http, dataSet) {
  $scope.dataSet = dataSet;
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
