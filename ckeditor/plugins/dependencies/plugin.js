CKEDITOR.plugins.add( 'dependencies', {
  icons: 'dependencies',
  init: function( editor ) {
    editor.addCommand( 'dependencies', new CKEDITOR.dialogCommand( 'dependenciesDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'dependencies', {
	    label: 'Insert Dependencies',
	    command: 'dependencies',
	    toolbar: 'invariantMining'
		});
		CKEDITOR.dialog.add( 'dependenciesDialog', this.path + 'dialogs/dependencies.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'dependencies')
		       {
		          evt.data.dialog =  'dependenciesDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


