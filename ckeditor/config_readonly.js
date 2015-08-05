/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';

  config.extraPlugins = 'findelement';
  config.disableAutoInline = true;
  // Define changes to default configuration here.
  // For complete reference see:
  // http://docs.ckeditor.com/#!/api/CKEDITOR.config

  // The toolbar groups arrangement, optimized for two toolbar rows.

  config.toolbarGroups = [
    { name: 'search' }
  ];

  config.removeButtons = 'Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe';

  // Simplify the dialog windows.
  config.removeDialogTabs = 'image:advanced;link:advanced';

  config.readOnly = true;
  config.resize_enabled = false;

};
