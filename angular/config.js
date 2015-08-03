var reportaApp = angular.module('reporta', ['ngRoute']);

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
  $scope.message = 'ab';
  $http({
    method: 'GET',
    url: '/api/getDataSources',
    params: { userId: $scope.user.id }
  })
  .success(function (data, status, headers, config) {
    console.log(data);
    $scope.name = data.name;
  })
  .error(function (data, status, headers, config) {
    $scope.name = 'Error!';
  })
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

