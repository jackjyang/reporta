CKEDITOR.plugins.add( 'iffCooccurrence', {
  icons: 'iffCooccurrence',
  init: function( editor ) {
    editor.addCommand( 'iffCooccurrence', new CKEDITOR.dialogCommand( 'iffCooccurrenceDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'iffCooccurrence', {
	    label: 'Insert IFF Co-Occurrence',
	    command: 'iffCooccurrence',
	    toolbar: 'invariantMining'
		});
		CKEDITOR.dialog.add( 'iffCooccurrenceDialog', this.path + 'dialogs/iffCooccurrence.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'iffCooccurrence')
		       {
		          evt.data.dialog =  'iffCooccurrenceDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


