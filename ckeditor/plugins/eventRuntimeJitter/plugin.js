CKEDITOR.plugins.add( 'eventRuntimeJitter', {
  icons: 'eventRuntimeJitter',
  init: function( editor ) {
    editor.addCommand( 'eventRuntimeJitter', new CKEDITOR.dialogCommand( 'eventRuntimeJitterDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'eventRuntimeJitter', {
	    label: 'Insert Event and Runtime Jitter',
	    command: 'eventRuntimeJitter',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'eventRuntimeJitterDialog', this.path + 'dialogs/eventRuntimeJitter.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'eventruntimejitter')
		       {
		          evt.data.dialog =  'eventRuntimeJitterDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
