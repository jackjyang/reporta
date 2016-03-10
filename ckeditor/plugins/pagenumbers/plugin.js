CKEDITOR.plugins.add('pageNumbers', {
  icons: 'PageNumber',
  init: function(editor) {
    editor.addCommand('pageNumberCommand', {
      exec: function(editor) {
      }
    });
    editor.ui.addButton('PageNumber', {
      label: 'Page Number',
      command: 'pageNumberCommand',
      toolbar: 'analytics'
    });

    $(document).ready(function () {
      $(document).on('click','.cke_button__pagenumber',function () {
        if($(this).hasClass('cke_button_off')) {
          $(this).removeClass('cke_button_off');
          $(this).addClass('cke_button_on');
        } else {
          $(this).removeClass('cke_button_on');
          $(this).addClass('cke_button_off');
        }
     });
    });
  }
});