CKEDITOR.plugins.add( 'fiveNumberSummary', {
  icons: 'fiveNumberSummary',
  init: function( editor ) {
    editor.addCommand( 'fiveNumberSummary', new CKEDITOR.dialogCommand( 'fiveNumberSummaryDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'fiveNumberSummary', {
	    label: 'Insert Five Number Summary',
	    command: 'fiveNumberSummary',
	    toolbar: 'multiTrace'
		});
		CKEDITOR.dialog.add( 'fiveNumberSummaryDialog', this.path + 'dialogs/fiveNumberSummary.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'fiveNumberSummary')
		       {
		          evt.data.dialog =  'fiveNumberSummaryDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


