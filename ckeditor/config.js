/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {

	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	config.extraPlugins = 'basic,anomaly,invariant,singletrace,multitrace,' +
		'findelement,dynamicText,pagebreak';

	config.dialog_noConfirmCancel = true;

	config.extraAllowedContent = 'img[data-id,data-type,data-name,data-desc]';

	config.height = '325px';

	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.

	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'search' },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' },
		'/',
		{ name: 'analytics' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript,Flash,Smiley,' +
		'Language,Save,NewPage,Preview,Print,Templates,SelectAll,SpellChecker,' +
		'Scayt,Link,Unlink,Anchor,Form,Checkbox,Radio,TextField,Textarea,Select,' +
		'Button,ImageButton,HiddenField,Maximize,ShowBlocks,Blockquote,' +
		'CreateDiv,BidiLtr,BidiRtl,About,Paste,PasteText,PasteFromWord,Styles,' +
		'Iframe';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	//config.readOnly = true;
};
