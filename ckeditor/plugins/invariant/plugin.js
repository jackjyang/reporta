CKEDITOR.plugins.add( 'invariant', {
  icons: 'invariant',
  init: function( editor ) {
    editor.addCommand( 'invariant', new CKEDITOR.dialogCommand( 'invariantDialog', {
			allowedContent: 'img[src,style,name,type]'
		}));
    editor.ui.addButton( 'Invariant', {
	    label: 'Insert Invariant Mining',
	    command: 'invariant',
	    toolbar: 'analytics'
		});
		CKEDITOR.dialog.add( 'invariantDialog', this.path + 'dialogs/invariant.js' );
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'type' ) == 'invariant')
		       {
		          evt.data.dialog =  'invariantDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});

