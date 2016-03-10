CKEDITOR.plugins.add('dynamicText', {
    icons: 'dynamicText',
    init: function(editor) {
      editor.addCommand('dynamicText', new CKEDITOR.dialogCommand('dynamicTextDialog'));
      editor.ui.addButton('DynamicText', {
        label: 'Dynamic Text',
        command: 'dynamicText',
        toolbar: 'analytics'
      });

      CKEDITOR.dialog.add('dynamicTextDialog', this.path + 'dialogs/dynamicText.js');

      editor.on('doubleclick', function(evt) {
      if (editor.config.isReadOnly) {
        evt.cancel();
        return;
      }

      var element = CKEDITOR.plugins.link.getSelectedLink(editor) || evt.data.element;

      if (!element.isReadOnly()) {
        if (element.getParent().getAttribute('data-type') == 'dynamicText') {
          evt.data.dialog = 'dynamicTextDialog';
          editor.getSelection().selectElement(element);
        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor, element)) {
          evt.data.dialog = 'anchor';
        }
      }
    });
    }
});