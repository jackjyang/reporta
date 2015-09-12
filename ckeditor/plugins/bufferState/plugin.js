CKEDITOR.plugins.add( 'bufferState', {
  icons: 'bufferState',
  init: function( editor ) {
    editor.addCommand( 'bufferState', new CKEDITOR.dialogCommand( 'bufferStateDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'bufferState', {
	    label: 'Insert Buffer State',
	    command: 'bufferState',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'bufferStateDialog', this.path + 'dialogs/bufferState.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'bufferstate')
		       {
		          evt.data.dialog =  'bufferStateDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
