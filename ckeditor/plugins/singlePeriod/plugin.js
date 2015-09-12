CKEDITOR.plugins.add( 'singlePeriod', {
  icons: 'singlePeriod',
  init: function( editor ) {
    editor.addCommand( 'singlePeriod', new CKEDITOR.dialogCommand( 'singlePeriodDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'singlePeriod', {
	    label: 'Insert Single Period',
	    command: 'singlePeriod',
	    toolbar: 'invariantMining'
		});
		CKEDITOR.dialog.add( 'singlePeriodDialog', this.path + 'dialogs/singlePeriod.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'singleperiod')
		       {
		          evt.data.dialog =  'singlePeriodDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
