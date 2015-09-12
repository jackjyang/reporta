CKEDITOR.plugins.add( 'regularityHeatmap', {
  icons: 'regularityHeatmap',
  init: function( editor ) {
    editor.addCommand( 'regularityHeatmap', new CKEDITOR.dialogCommand( 'regularityHeatmapDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'regularityHeatmap', {
	    label: 'Insert Regularity Heatmap',
	    command: 'regularityHeatmap',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'regularityHeatmapDialog', this.path + 'dialogs/regularityHeatmap.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'regularityheatmap')
		       {
		          evt.data.dialog =  'regularityHeatmapDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
