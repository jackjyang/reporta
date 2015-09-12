CKEDITOR.plugins.add( 'systemIdleTime', {
  icons: 'systemIdleTime',
  init: function( editor ) {
    editor.addCommand( 'systemIdleTime', new CKEDITOR.dialogCommand( 'systemIdleTimeDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'systemIdleTime', {
	    label: 'Insert System Idle Time',
	    command: 'systemIdleTime',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'systemIdleTimeDialog', this.path + 'dialogs/systemIdleTime.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'systemidletime')
		       {
		          evt.data.dialog =  'systemIdleTimeDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});


