CKEDITOR.plugins.add( 'followedBy', {
  icons: 'followedBy',
  init: function( editor ) {
    editor.addCommand( 'followedBy', new CKEDITOR.dialogCommand( 'followedByDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'followedBy', {
	    label: 'Insert Followed By',
	    command: 'followedBy',
	    toolbar: 'invariantMining'
		});
		CKEDITOR.dialog.add( 'followedByDialog', this.path + 'dialogs/followedBy.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'followedBy')
		       {
		          evt.data.dialog =  'followedByDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


