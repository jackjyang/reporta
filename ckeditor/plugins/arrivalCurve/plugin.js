CKEDITOR.plugins.add( 'arrivalCurve', {
  icons: 'arrivalCurve',
  init: function( editor ) {
    editor.addCommand( 'arrivalCurve', new CKEDITOR.dialogCommand( 'arrivalCurveDialog', {
      allowedContent: 'img[src,style,data-type,data-name,data-desc]'
    }));
    editor.ui.addButton( 'arrivalCurve', {
	    label: 'Insert Arrival Curve',
	    command: 'arrivalCurve',
	    toolbar: 'singleTrace'
		});
		CKEDITOR.dialog.add( 'arrivalCurveDialog', this.path + 'dialogs/arrivalCurve.js' );
		editor.on('doubleclick', function(evt) {
		    var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;
		    if ( !element.isReadOnly() )
		    {
		       if ( element.getAttribute( 'data-type' ) == 'arrivalcurve')
		       {
		          evt.data.dialog =  'arrivalCurveDialog' ;
		          editor.getSelection().selectElement( element );
		       }
		       else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
		          evt.data.dialog = 'anchor';
		    }
	 	});
  }
});
