CKEDITOR.plugins.add('anomaly', {
  init: function(editor) {
    editor.addCommand('densityMap', new CKEDITOR.dialogCommand('densityMapDialog'));
    editor.addCommand('markovModel', new CKEDITOR.dialogCommand('markovModelDialog'));

    CKEDITOR.dialog.add('densityMapDialog', this.path + 'dialogs/densityMap.js');
    CKEDITOR.dialog.add('markovModelDialog', this.path + 'dialogs/markovModel.js');

    editor.on('doubleclick', function(evt) {
      if (editor.config.isReadOnly) {
        evt.cancel();
        return;
      }

      var element = CKEDITOR.plugins.link.getSelectedLink(editor) || evt.data.element;

      if (!element.isReadOnly()) {
        if (element.getAttribute('data-type') == 'DensityMaps') {
          evt.data.dialog =  'densityMapDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'markovmodel') {
          evt.data.dialog =  'markovModelDialog';
          editor.getSelection().selectElement(element);
        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor, element)) {
          evt.data.dialog = 'anchor';
        }
      }
    });

    var config = editor.config;
    var charts = [];
    charts[0] = ['density', 'Insert Density Map', 'Density Map'];
    charts[1] = ['markov', 'Insert Markov Model', 'Markov Model'];
    editor.ui.addRichCombo('anomaly', {
      label: 'Anomaly Detection',
      toolbar: 'analytics',
      // title :'Insert tokens',
      // voiceLabel : 'Insert tokens',
      // className : 'cke_format',
      multiSelect: false,
      voiceLabel: 'a',
      // paneltitle: 'a',
      panel: {
        title: 'aaa',
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
        if (value == 'density') {
          editor.execCommand('densityMap');
        } else if (value == 'markov') {
          editor.execCommand('markovModel');
        }
      }
   });
  }
});
