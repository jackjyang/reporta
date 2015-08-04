CKEDITOR.plugins.add( 'multitrace', {
  icons: 'multitrace',
  init: function( editor ) {
    editor.addCommand( 'multitrace', new CKEDITOR.dialogCommand( 'multitraceDialog', {
			allowedContent: 'img[src,style,name,type]'
		}));
    editor.ui.addButton( 'multitrace', {
	    label: 'Insert Multi Trace Analytics',
	    command: 'multitrace',
	    toolbar: 'analytics'
		});
		CKEDITOR.dialog.add( 'multitraceDialog', this.path + 'dialogs/multitrace.js' );
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'type' ) == 'multitrace')
		       {
		          evt.data.dialog =  'multitraceDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});

