  CKEDITOR.plugins.add( 'findelement', {
    icons: 'prev,next',
    init: function( editor ) {

      var prevcommand = editor.addCommand( 'findprev',
      {
        exec : function( editor )
        {
          var nodeList = editor.document.find( 'img' );
          if (nodeList.count() == 0)
            return;

          var a = editor.getSelection().getStartElement();
          if (!a)
            return;
          for (i = nodeList.count() - 1; i >= 0; i--){
            if ((a.getParent().getIndex() == nodeList.getItem(i).getParent().getIndex()  &&
                a.getIndex() > nodeList.getItem(i).getIndex()) ||
               (a.getParent().getIndex() > nodeList.getItem(i).getParent().getIndex()))
            {

              editor.getSelection().selectElement(nodeList.getItem(i));
              editor.getSelection().scrollIntoView();
              return;
            }
          }
          editor.getSelection().selectElement(nodeList.getItem(nodeList.count() -1));
          editor.getSelection().scrollIntoView();
          return;

          // TODO: index bug
        }
      });


      var nextcommand = editor.addCommand( 'findnext',
      {
        exec : function( editor )
        {
          var nodeList = editor.document.find( 'img' );
          if (nodeList.count() == 0)
            return;

          var a = editor.getSelection().getStartElement();
          // TODO: no start element in readonly mode
          if (!a)
            return;
          for (i = 0; i < nodeList.count(); i++){
            if ((a.getParent().getIndex() == nodeList.getItem(i).getParent().getIndex()  &&
                a.getIndex() < nodeList.getItem(i).getIndex()) ||
               (a.getParent().getIndex() < nodeList.getItem(i).getParent().getIndex())) {
              editor.getSelection().selectElement(nodeList.getItem(i));
              editor.getSelection().scrollIntoView();
              return;
            }
          }
          editor.getSelection().selectElement(nodeList.getItem(0));
          editor.getSelection().scrollIntoView();
          return;

          // TODO: index bug
        }
      });

      prevcommand.canUndo = false;
      nextcommand.canUndo = false;
      prevcommand.readOnly = 1;
      nextcommand.readOnly = 1;

      if ( editor.ui.addButton ) {
        editor.ui.addButton( 'PrevElement', {
          label: 'Previous Element',
          command: 'findprev',
          toolbar: 'search',
          icon: this.path + 'icons/prev.png'
        } );
        editor.ui.addButton( 'NextElement', {
          label: 'Next Element',
          command: 'findnext',
          toolbar: 'search',
          icon: this.path + 'icons/next.png'
        } );
      }
    }
  });