CKEDITOR.plugins.add( 'performance', {
  icons: 'performance',
  init: function( editor ) {
    editor.addCommand( 'performance', new CKEDITOR.dialogCommand( 'performanceDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'performance', {
	    label: 'Insert Performance Analytic',
	    command: 'performance',
	    toolbar: 'basicAnalytic'
		});
		CKEDITOR.dialog.add( 'performanceDialog', this.path + 'dialogs/performance.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'performance')
		       {
		          evt.data.dialog =  'performanceDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
