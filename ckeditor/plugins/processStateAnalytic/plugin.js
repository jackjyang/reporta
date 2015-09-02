CKEDITOR.plugins.add( 'processStateAnalytic', {
  icons: 'processStateAnalytic',
  init: function( editor ) {
    editor.addCommand( 'processStateAnalytic', new CKEDITOR.dialogCommand( 'processStateAnalyticDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'processStateAnalytic', {
	    label: 'Insert Process State Analytic',
	    command: 'processStateAnalytic',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'processStateAnalyticDialog', this.path + 'dialogs/processStateAnalytic.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'processStateAnalytic')
		       {
		          evt.data.dialog =  'processStateAnalyticDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


