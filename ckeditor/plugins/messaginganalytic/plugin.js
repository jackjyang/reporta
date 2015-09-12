CKEDITOR.plugins.add( 'messaginganalytic', {
  icons: 'messaginganalytic',
  init: function( editor ) {
    editor.addCommand( 'messaginganalytic', new CKEDITOR.dialogCommand( 'messagingAnalyticDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'messagingAnalytic', {
	    label: 'Insert Messaging Analytic',
	    command: 'messaginganalytic',
	    toolbar: 'basicAnalytic'
		});
		CKEDITOR.dialog.add( 'messagingAnalyticDialog', this.path + 'dialogs/messaginganalytic.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'messaginganalytic')
		       {
		          evt.data.dialog =  'messagingAnalyticDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
