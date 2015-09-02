CKEDITOR.plugins.add( 'ecdf', {
  icons: 'ecdf',
  init: function( editor ) {
    editor.addCommand( 'ecdf', new CKEDITOR.dialogCommand( 'ecdfDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'ecdf', {
	    label: 'Insert ECDF',
	    command: 'ecdf',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'ecdfDialog', this.path + 'dialogs/ecdf.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'ecdf')
		       {
		          evt.data.dialog =  'ecdfDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


