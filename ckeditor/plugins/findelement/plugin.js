  CKEDITOR.plugins.add( 'findelement', {
    icons: 'next',
    init: function( editor ) {
      editor.addCommand( 'findelement',
      {
        exec : function( editor )
        {
          var nodeList = editor.document.find( 'img' );
          if (nodeList.count() == 0)
            return;

          var a = editor.getSelection().getStartElement();
          for (i = 0; i < nodeList.count(); i++){
            if (a.getIndex() < nodeList.getItem(i).getIndex()) {
              editor.getSelection().selectElement(nodeList.getItem(i));
              return;
            }
          }
          editor.getSelection().selectElement(nodeList.getItem(0));
          return;

          // TODO: index bug
        }
      });

      editor.ui.addButton( 'FindNextElement', {
        label: 'Find Next Element',
        command: 'findelement',
        toolbar: 'insert'
      });
    }
  });