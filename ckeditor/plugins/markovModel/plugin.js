CKEDITOR.plugins.add( 'markovModel', {
  icons: 'markovModel',
  init: function( editor ) {
    editor.addCommand( 'markovModel', new CKEDITOR.dialogCommand( 'markovModelDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'markovModel', {
	    label: 'Insert Markov Model',
	    command: 'markovModel',
	    toolbar: 'anomalyDetection'
		});
		CKEDITOR.dialog.add( 'markovModelDialog', this.path + 'dialogs/markovModel.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'markovmodel')
		       {
		          evt.data.dialog =  'markovModelDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
