CKEDITOR.plugins.add( 'erroranalytic', {
  icons: 'erroranalytic',
  init: function( editor ) {
    editor.addCommand( 'erroranalytic', new CKEDITOR.dialogCommand( 'errorAnalyticDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'errorAnalytic', {
	    label: 'Insert Error Analytic',
	    command: 'erroranalytic',
	    toolbar: 'basicAnalytic'
		});
		CKEDITOR.dialog.add( 'errorAnalyticDialog', this.path + 'dialogs/erroranalytic.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'erroranalytic')
		       {
		          evt.data.dialog =  'errorAnalyticDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
