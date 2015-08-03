var reportaApp = angular.module('reporta', ['ngRoute', 'ui.bootstrap']);

reportaApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/dashboard',
    controller: 'dashboardController'
  })
  .when('/dashboard', {
    templateUrl: 'partials/dashboard',
    controller: 'dashboardController'
  })
  .when('/data_sources', {
    templateUrl: 'partials/data_sources',
    controller: 'dataSourcesController'
  })
  .when('/data_sets', {
    templateUrl: 'partials/data_sets',
    controller: 'dataSetsController'
  })
  .when('/templates', {
    templateUrl: 'partials/templates',
    controller: 'templatesController'
  })
  .when('/recipes', {
    templateUrl: 'partials/recipes',
    controller: 'recipesController'
  })
  .when('/generate_report', {
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
  if (!$scope.dataSources) {
    $http({ method: 'GET',
            url: '/api/getDataSources',
            params: { userId: $scope.user.id }
          }
    )
    .success(function (data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.dataSources = data.message;
    })
    .error(function (data, status, headers, config) {
    });
  }
});

reportaApp.controller('dataSourceButtonController', function($scope, $modal, $http) {
  var dirtySource = Object.create($scope.$parent.source); // Deep copy of source.
  $scope.openEditModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'modals/data_source_edit',
      controller: 'dataSourceEditModalController',
      resolve: {
        source: function () {
          return dirtySource;
        }
      }
    });
    modalInstance.result.then(function(source) {
      var oldSourceName = $scope.$parent.source.name;

      // Save button was clicked. Update parent's source.
      source.updated_on = new Date();
      $scope.$parent.source = source;

      // Call API to update entry in database.
      $http({ method: 'POST',
              url: '/api/updateDataSource',
              data: { userId: $scope.user.id,
                      oldSource: { name: oldSourceName },
                      source: source
                    }
            });
    });
  };
});

reportaApp.controller('dataSourceEditModalController', function($scope, $modalInstance, source) {
  $scope.source = source;
  $scope.save = function() {
    $modalInstance.close($scope.source);
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

reportaApp.controller('dataSetsController', function($scope) {
  $scope.message = 'ac';
});

reportaApp.controller('templatesController', function($scope) {
  $scope.message = 'ad';
});

reportaApp.controller('recipesController', function($scope) {
  $scope.message = 'ae';
});

reportaApp.controller('generateController', function($scope) {
  $scope.message = 'af';
});

