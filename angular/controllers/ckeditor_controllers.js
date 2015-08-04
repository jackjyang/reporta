var reportaApp = angular.module('reporta');

reportaApp.controller('ckeditorRecipeController', function($scope) {
  CKEDITOR.config.disableAutoInline = true;
  CKEDITOR.config.readOnly = true;

  // TODO: need to actually remove button

  CKEDITOR.replace('editor1');
});