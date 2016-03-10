var reportaApp = angular.module('reporta');

function compareDate(a,b) {
  if (a.created_on < b.created_on)
    return 1;
  else if (a.created_on > b.created_on)
    return -1;
  else
    return 0;
}

reportaApp.controller('dashboardController', function($scope, $http) {
  $scope.refreshContents = function() {
    $http({
      method: 'GET',
      url: '/api/getTemplates',
      params: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.templates = data.message;
      // Sort by created_on date, and truncate to first 5 elems.
      $scope.templates.sort(compareDate);
      $scope.templates = $scope.templates.slice(0, 5);
    });

    $http({
      method: 'GET',
      url: '/api/getRecipes',
      params: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.recipes = data.message;
      $scope.recipes.sort(compareDate);
      $scope.recipes = $scope.recipes.slice(0, 5);
    });

  }
  if (!$scope.recipes || !$scope.templates)
    $scope.refreshContents();
});

