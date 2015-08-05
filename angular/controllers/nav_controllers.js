var reportaApp = angular.module('reporta');

reportaApp.controller('navController', function($scope, $location) {
  $scope.$on('$locationChangeStart', function(event) {
    // Highlight the appropriate side-tab when navigating directly that page.
    var path = $location.path().substring(1); // Path of current page, removing the leading '/'.
    var sidetabsContainer = document.getElementById('sidetabs');
    var viewContainer = document.getElementById('viewContainer');

    if (path == '') // Set default when on root page.
      path = 'dashboard';

    // Reset all tabs first.
    var sidetabs = sidetabsContainer.childNodes;
    for (var i = 0; i < sidetabs.length; i++)
      sidetabs[i].classList.remove('active');

    var pageTab = document.getElementById(path);
    if (pageTab) {
      pageTab.classList.add('active');
      sidetabsContainer.style.display = 'inline';
      viewContainer.classList.add('col-md-9');
    }
    else {
      // We're not on a page on the sidetab. Hide the sidetabs.
      sidetabsContainer.style.display = 'none';
      viewContainer.classList.remove('col-md-9');
    }
  });
});
