var reportaApp = angular.module('reporta');

reportaApp.controller('ckeditorRecipeController', function($scope) {
  CKEDITOR.config.disableAutoInline = true;
  CKEDITOR.config.readOnly = true;
  CKEDITOR.config.extraPlugins = 'chart, findelement';
  CKEDITOR.replace( 'editor1', {
    toolbar: [
      { name: 'about', items: [ 'About' ] }
    ]
  });
});