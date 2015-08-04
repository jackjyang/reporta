var reportaApp = angular.module('reporta');

reportaApp.controller('ckeditorRecipeController', function($scope) {
  CKEDITOR.disableAutoInline = true;
  CKEDITOR.replace('editor1');
});