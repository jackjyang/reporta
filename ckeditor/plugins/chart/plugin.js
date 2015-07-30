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

	editor.on( 'doubleclick', function( evt )
	{
	    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

	    if ( !element.isReadOnly() )
	    {
	       if ( element.getAttribute( 'type' ))
	       {
	          evt.data.dialog =  'chartDialog' ;
	          editor.getSelection().selectElement( element );
	       }
	       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
	          evt.data.dialog = 'anchor';
	    }
 	});	
  }
});

