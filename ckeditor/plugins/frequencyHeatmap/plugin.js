CKEDITOR.plugins.add( 'frequencyHeatmap', {
  icons: 'frequencyHeatmap',
  init: function( editor ) {
    editor.addCommand( 'frequencyHeatmap', new CKEDITOR.dialogCommand( 'frequencyHeatmapDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'frequencyHeatmap', {
	    label: 'Insert Frequency Heatmap',
	    command: 'frequencyHeatmap',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'frequencyHeatmapDialog', this.path + 'dialogs/frequencyHeatmap.js' );
    // TODO - open form when double clicked.
		editor.on( 'doubleclick', function( evt )
		{
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'frequencyheatmap')
		       {
		          evt.data.dialog =  'frequencyHeatmapDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
