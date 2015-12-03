var reportaApp = angular.module('reporta');

reportaApp.controller('generationController', function($scope, $http) {
  $scope.allRecipes = [];

  $scope.recipe = {};
  $scope.email = "";

  $scope.validateEmail = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  $scope.getRecipes = function() {
    $http({
      method: 'GET',
      url: '/api/getRecipes',
      params: { userId: $scope.user.id }
    }).success(function(data, status, headers, config) {
      data.message.forEach(function(elem) {
        elem.updated_on = new Date(elem.updated_on);
        elem.created_on = new Date(elem.created_on);
      });
      $scope.allRecipes = data.message;
    });
  };

  $scope.generatedReport = function() {
    console.log("start generate report request");
    $http({
      method: 'GET',
      url: '/api/generateReport',
      params: { userId: $scope.user.id, recipeId:1, email:$scope.email }
    }).success(function(data, status, headers, config) {
      console.log("generate report succeeded")
    }).error(function() {
      console.log("generate report failed");
    });
  }

  $scope.init = function() {
    $scope.getRecipes();
  }

  $scope.generate = function() {
    if($(".ng-invalid").size() > 0 || !$scope.validateEmail($scope.email)) {
      console.log("failed initial validation");
      return;
    }
    $scope.generatedReport();
  }

});