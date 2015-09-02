CKEDITOR.plugins.add( 'precededBy', {
  icons: 'precededBy',
  init: function( editor ) {
    editor.addCommand( 'precededBy', new CKEDITOR.dialogCommand( 'precededByDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'precededBy', {
	    label: 'Insert Preceded By',
	    command: 'precededBy',
	    toolbar: 'invariantMining'
		});
		CKEDITOR.dialog.add( 'precededByDialog', this.path + 'dialogs/precededBy.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'precededBy')
		       {
		          evt.data.dialog =  'precededByDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


