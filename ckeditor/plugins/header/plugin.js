CKEDITOR.plugins.add('header', {
  init: function(editor) {
    var cmd = new CKEDITOR.dialogCommand('headerDialog');
    editor.addCommand('header', new CKEDITOR.dialogCommand('headerDialog'));

    CKEDITOR.dialog.add('headerDialog', this.path + 'dialogs/header.js');

    editor.ui.addButton( 'Header', {
      label: 'Insert Header',
      command: 'header',
      toolbar: 'insert',
      icon: this.path + 'icons/header-footer.png',
      onClick : function(value) {
        editor.execCommand('header');
      }
    } );

  }
});
