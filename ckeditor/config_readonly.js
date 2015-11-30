/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
  config.allowedContent = true;

  config.disableAutoInline = true;

  config.extraPlugins = 'basic,anomaly,invariant,singletrace,multitrace,findelement';

  config.height = '325px';

  // don't use default readOnly
  config.isReadOnly = true;

  // Simplify the dialog windows.
  config.removeDialogTabs = 'image:advanced;link:advanced';

  config.resize_enabled = false;

  // The toolbar groups arrangement, optimized for two toolbar rows.
  config.toolbarGroups = [
    { name: 'search' },
    { name: 'about' }
  ];
};