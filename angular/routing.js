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

// TODO: Move these to separate files when implementing them.
reportaApp.controller('dashboardController', function($scope) {
});

reportaApp.controller('dataSetsController', function($scope) {
});

reportaApp.controller('templatesController', function($scope) {
});

reportaApp.controller('recipesController', function($scope) {
});

reportaApp.controller('generateController', function($scope) {
});
