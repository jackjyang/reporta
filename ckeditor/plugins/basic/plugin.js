CKEDITOR.plugins.add( 'basic', {
  icons: 'basic',
  init: function( editor ) {
    editor.addCommand( 'basic', new CKEDITOR.dialogCommand( 'basicDialog', {
			allowedContent: 'img[src,style,name,type]'
		}));
    editor.ui.addButton( 'Basic', {
	    label: 'Insert Basic Analytic',
	    command: 'basic',
	    toolbar: 'analytics'
		});
		CKEDITOR.dialog.add( 'basicDialog', this.path + 'dialogs/basic.js' );
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'type' ) == 'basic')
		       {
		          evt.data.dialog =  'basicDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});

