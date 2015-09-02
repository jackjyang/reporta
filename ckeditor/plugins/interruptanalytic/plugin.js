CKEDITOR.plugins.add( 'interruptanalytic', {
  icons: 'interruptanalytic',
  init: function( editor ) {
    editor.addCommand( 'interruptanalytic', new CKEDITOR.dialogCommand( 'interruptAnalyticDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'InterruptAnalytic', {
	    label: 'Insert Interrupt Analytic',
	    command: 'interruptanalytic',
	    toolbar: 'basicAnalytic'
		});
		CKEDITOR.dialog.add( 'interruptAnalyticDialog', this.path + 'dialogs/interruptanalytic.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-analytictype' ) == 'interruptanalytic')
		       {
		          evt.data.dialog =  'interruptAnalyticDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


