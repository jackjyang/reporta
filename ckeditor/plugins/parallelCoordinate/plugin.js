CKEDITOR.plugins.add( 'parallelCoordinate', {
  icons: 'parallelCoordinate',
  init: function( editor ) {
    editor.addCommand( 'parallelCoordinate', new CKEDITOR.dialogCommand( 'parallelCoordinateDialog', {
      allowedContent: 'img[src,style,name,data-analytictype]'
    }));
    editor.ui.addButton( 'parallelCoordinate', {
      label: 'Insert Parallel Coordinate',
      command: 'parallelCoordinate',
      toolbar: 'multiTrace'
    });
    CKEDITOR.dialog.add( 'parallelCoordinateDialog', this.path + 'dialogs/parallelCoordinate.js' );
    // TODO - open form when double clicked.
    editor.on( 'doubleclick', function( evt )
    {
        var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

        if ( !element.isReadOnly() )
        {
           if ( element.getAttribute( 'data-analytictype' ) == 'parallelCoordinate')
           {
              evt.data.dialog =  'parallelCoordinateDialog' ;
              editor.getSelection().selectElement( element );
           }
           else if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) )
              evt.data.dialog = 'anchor';
        }
    });
  }
});


