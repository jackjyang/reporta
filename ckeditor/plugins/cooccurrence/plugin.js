CKEDITOR.plugins.add( 'cooccurrence', {
  icons: 'cooccurrence',
  init: function( editor ) {
    editor.addCommand( 'cooccurrence', new CKEDITOR.dialogCommand( 'cooccurrenceDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'cooccurrence', {
	    label: 'Insert Co-Occurrence',
	    command: 'cooccurrence',
	    toolbar: 'invariantMining'
		});
		CKEDITOR.dialog.add( 'cooccurrenceDialog', this.path + 'dialogs/cooccurrence.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'cooccurrence')
		       {
		          evt.data.dialog =  'cooccurrenceDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
