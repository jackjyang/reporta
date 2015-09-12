CKEDITOR.plugins.add( 'densityMap', {
  icons: 'densityMap',
  init: function( editor ) {
    editor.addCommand( 'densityMap', new CKEDITOR.dialogCommand( 'densityMapDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'densityMap', {
	    label: 'Insert Density Map',
	    command: 'densityMap',
	    toolbar: 'anomalyDetection'
		});
		CKEDITOR.dialog.add( 'densityMapDialog', this.path + 'dialogs/densityMap.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'densitymap')
		       {
		          evt.data.dialog =  'densityMapDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
