var reportaApp = angular.module('reporta');

reportaApp.controller('navController', function($scope, $location) {
  // Highlight the appropriate side-tab when navigating directly that page.
  var path = $location.path().substring(1); // Path of current page, removing the leading '/'.
  if (path == '') // Set default when on root page.
    path = 'dashboard';
  var elem = document.getElementById(path);
  if (elem)
    elem.className = 'active';
});
