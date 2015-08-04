CKEDITOR.plugins.add( 'singletrace', {
  icons: 'singletrace',
  init: function( editor ) {
    editor.addCommand( 'singletrace', new CKEDITOR.dialogCommand( 'singletraceDialog', {
			allowedContent: 'img[src,style,name,type]'
		}));
    editor.ui.addButton( 'singletrace', {
	    label: 'Insert Single Trace Analytics',
	    command: 'singletrace',
	    toolbar: 'analytics'
		});
		CKEDITOR.dialog.add( 'singletraceDialog', this.path + 'dialogs/singletrace.js' );
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'type' ) == 'singletrace')
		       {
		          evt.data.dialog =  'singletraceDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});

