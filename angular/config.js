var reportaApp = angular.module('reporta', ['ngRoute', 'ui.bootstrap']);

reportaApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/dashboard',
    controller: 'dashboardController'
  }).when('/dashboard', {
    templateUrl: 'partials/dashboard',
    controller: 'dashboardController'
  }).when('/data_sources', {
    templateUrl: 'partials/data_sources',
    controller: 'dataSourcesController'
  }).when('/data_sets', {
    templateUrl: 'partials/data_sets',
    controller: 'dataSetsController'
  }).when('/templates', {
    templateUrl: 'partials/templates',
    controller: 'templatesController'
  }).when('/recipes', {
    templateUrl: 'partials/recipes',
    controller: 'recipesController'
  }).when('/generate_report', {
    templateUrl: 'partials/generate_report',
    controller: 'generateController'
  });
  $locationProvider.html5Mode(true);
});

reportaApp.controller('navController', function($scope, $location) {
  // Highlight the appropriate side-tab when navigating directly that page.
  var path = $location.path().substring(1); // Path of current page, removing the leading '/'.
  if (path == '') // Set default when on root page.
    path = 'dashboard';
  var elem = document.getElementById(path);
  if (elem)
    elem.className = 'active';
});

reportaApp.controller('dashboardController', function($scope) {
});

reportaApp.controller('dataSourcesController', function($scope, $http) {
  $scope.refreshContents = function() {
    $http({
      method: 'GET',
      url: '/api/getDataSources',
      params: { userId: $scope.user.id }
    }).success(function (data, status, headers, config) {
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
      controller: 'dataSourceNewModalController'
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
        source: function () {
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
        source: function () {
          return $scope.$parent.source;
        }
      }
    });
    modalInstance.result.then(function(source) {
      $scope.$parent.refreshContents();
    });
  };
});

reportaApp.controller('dataSourceNewModalController', function($scope, $modalInstance, $http) {
  $scope.save = function() {
    $scope.source.userId = $scope.user.id;
    $http({
      method: 'POST',
      url: '/api/addDataSource',
      data: $scope.source
    }).success(function (data, status, headers, config) {
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
    }).success(function (data, status, headers, config) {
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
      data: { source }
    }).success(function (data, status, headers, config) {
      // TODO: Display any errors to the user before closing modal.
      $modalInstance.close(source);
    });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('dataSetsController', function($scope) {
});

reportaApp.controller('templatesController', function($scope) {
});

reportaApp.controller('recipesController', function($scope) {
});

reportaApp.controller('generateController', function($scope) {
});

