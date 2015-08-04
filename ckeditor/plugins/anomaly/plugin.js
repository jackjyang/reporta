CKEDITOR.plugins.add( 'anomaly', {
  icons: 'anomaly',
  init: function( editor ) {
    editor.addCommand( 'anomaly', new CKEDITOR.dialogCommand( 'anomalyDialog', {
			allowedContent: 'img[src,style,name,type]'
		}));
    editor.ui.addButton( 'Anomaly', {
	    label: 'Insert Anomaly Detection',
	    command: 'anomaly',
	    toolbar: 'analytics'
		});
		CKEDITOR.dialog.add( 'anomalyDialog', this.path + 'dialogs/anomaly.js' );
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'type' ) == 'anomaly')
		       {
		          evt.data.dialog =  'anomalyDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});

