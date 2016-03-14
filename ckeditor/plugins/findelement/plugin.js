  CKEDITOR.plugins.add( 'findelement', {
    icons: 'prev,next',
    init: function( editor ) {

      function getForm(editor, selected) {
          editor.getSelection().selectElement(selected);
          editor.getSelection().scrollIntoView();

          var analyticType = selected.getAttribute('data-type');
          editor.fire('findElementEvent', analyticType);

          return;
      };

      function compareTo (address1, address2, isLessThan) {
        var i = 0;
        while (i < address1.length && i < address2.length) {
          if (address1[i] == address2[i]) {
            i++;
            continue;
          }

          if ((address1[i] > address2[i]) == isLessThan)
            return true;
          else
            return false;
        }
        if (address1.length == address2.length)
          return false;

        return ((address1.length > address2.length) == isLessThan);
      }

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

          var selected = nodeList.getItem(nodeList.count() -1);

          for (i = nodeList.count() - 1; i >= 0; i--) {
            if (compareTo(a.getAddress(), nodeList.getItem(i).getAddress(), true)) {
              selected = nodeList.getItem(i)
              break;
            }
          }

          getForm(editor, selected);
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
          if (!a)
            return;

          var selected = nodeList.getItem(0);

          for (i = 0; i < nodeList.count(); i++){
            if (compareTo(a.getAddress(), nodeList.getItem(i).getAddress(), false)) {
              selected = nodeList.getItem(i);
              break;
            }
          }

          getForm(editor, selected);
        }
      });

      var currentcommand = editor.addCommand ('findcurrent',
      {
        exec : function( editor )
        {
          var nodeList = editor.document.find( 'img' );
          if (nodeList.count() == 0)
            return;

          var selected = editor.getSelection().getStartElement();
          if (!selected)
            return;

          getForm(editor, selected);
        }
      })

      prevcommand.canUndo = false;
      nextcommand.canUndo = false;
      currentcommand.canUndo = false;
      prevcommand.readOnly = 1;
      nextcommand.readOnly = 1;
      currentcommand.readOnly = 1;

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