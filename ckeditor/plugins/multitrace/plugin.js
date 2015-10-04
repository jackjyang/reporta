CKEDITOR.plugins.add('multitrace', {
  init: function(editor) {
    editor.addCommand('fiveNumberSummary', new CKEDITOR.dialogCommand('fiveNumberSummaryDialog'));
    editor.addCommand('parallelCoordinates', new CKEDITOR.dialogCommand('parallelCoordinatesDialog'));

    CKEDITOR.dialog.add('fiveNumberSummaryDialog', this.path + 'dialogs/fiveNumberSummary.js');
    CKEDITOR.dialog.add('parallelCoordinatesDialog', this.path + 'dialogs/parallelCoordinates.js');

    editor.on('doubleclick', function(evt) {
      var element = CKEDITOR.plugins.link.getSelectedLink(editor) || evt.data.element;

      if (!element.isReadOnly()) {
        if (element.getAttribute('data-type') == 'fiveNumberSummary') {
          evt.data.dialog =  'fiveNumberSummaryDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'parallelCoordinates') {
          evt.data.dialog =  'parallelCoordinatesDialog';
          editor.getSelection().selectElement(element);
        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor, element)) {
          evt.data.dialog = 'anchor';
        }
      }
    });

    var config = editor.config;
    var charts = [];
    charts[0] = ['fiveNumberSummary', 'Insert Five-Number Summary', 'Five-Number Summary'];
    charts[1] = ['parallelCoordinates', 'Insert Parallel Coordinates', 'Parallel Coordinates'];
    editor.ui.addRichCombo('multitrace', {
      label: 'Custom Multi-trace Analytics',
      toolbar: 'analytics',
      // title :'Insert tokens',
      // voiceLabel : 'Insert tokens',
      // className : 'cke_format',
      multiSelect: false,
      voiceLabel: 'a',
      // paneltitle: 'a',
      panel: {
        title: 'aaaa',
        // attributes: { 'aria-label': 'State' },
        css: [config.contentsCss, CKEDITOR.skin.getPath('editor')],
        // voiceLabel : lang.panelVoiceLabel
      },
      init : function() {
        for (var chart in charts){
          this.add(charts[chart][0], charts[chart][1], charts[chart][2]);
        }
      },
      onClick : function(value) {
        if (value == 'fiveNumberSummary') {
          editor.execCommand('fiveNumberSummary');
        } else if (value == 'parallelCoordinates') {
          editor.execCommand('parallelCoordinates');
        }
      }
   });
  }
});
