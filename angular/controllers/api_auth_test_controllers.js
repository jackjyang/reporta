var reportaApp = angular.module('reporta');

reportaApp.controller('apiAuthTestController', function($scope, $http) {
  $scope.makeRequest = function() {
    $scope.result = "Waiting...";
    $http({
        url: 'http://test.acerta.ca/api/traces',
        method: 'get',
        withCredentials: true
    }).success(function(data, status, headers, config) {
      $scope.result = data;
    }).error(function(data, status, headers, config) {
      $scope.result = "Error! See Javascript console";
    });
  };
});
