var reportaApp = angular.module('reporta', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'angularjs-dropdown-multiselect']);

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
  }).when('/template_editor/:template?', {
    templateUrl: 'partials/template_editor',
    controller: 'templateEditorController'
  }).when('/recipes', {
    templateUrl: 'partials/recipes',
    controller: 'recipesController'
  }).when('/recipe_editor/:recipe?', {
    templateUrl: 'partials/recipe_editor',
    controller: 'recipeEditorController'
  }).when('/generate_report', {
    templateUrl: 'partials/generate_report',
    controller: 'generateReportController'
  });
  $locationProvider.html5Mode(true);
});

// TODO: Move these to separate files when implementing them.
reportaApp.controller('dashboardController', function($scope) {
});

reportaApp.controller('dataSetsController', function($scope) {
});

reportaApp.controller('recipeEditorController', function($scope) {
});

reportaApp.controller('generateReportController', function($scope) {
});

reportaApp.controller('templateEditorController', function($scope) {
});

