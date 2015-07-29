CKEDITOR.plugins.add( 'chart', {
  icons: 'chart',
  init: function( editor ) {
    editor.addCommand( 'chart', new CKEDITOR.dialogCommand( 'chartDialog' ) );
    editor.ui.addButton( 'Chart', {
	    label: 'Insert Chart',
	    command: 'chart',
	    toolbar: 'insert'
		});
		CKEDITOR.dialog.add( 'chartDialog', this.path + 'dialogs/chart.js' );
  }
});