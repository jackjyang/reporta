var reportaApp = angular.module('reporta');

reportaApp.controller('ckeditorRecipeController', function($scope) {
  CKEDITOR.replace('editor1',
    {
      customConfig : '/ckeditor/config_readonly.js'
    });
});