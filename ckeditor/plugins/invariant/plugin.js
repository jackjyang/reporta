CKEDITOR.plugins.add('invariant', {
  icons: 'invariant',
  init: function(editor) {
    editor.addCommand('cooccurrence', new CKEDITOR.dialogCommand('cooccurrenceDialog'));
    editor.addCommand('followedBy', new CKEDITOR.dialogCommand('followedByDialog'));
    editor.addCommand('precededBy', new CKEDITOR.dialogCommand('precededByDialog'));
    editor.addCommand('iffCooccurrence', new CKEDITOR.dialogCommand('iffCooccurrenceDialog'));
    editor.addCommand('singlePeriod', new CKEDITOR.dialogCommand('singlePeriodDialog'));
    editor.addCommand('dependencies', new CKEDITOR.dialogCommand('dependenciesDialog'));

    CKEDITOR.dialog.add('cooccurrenceDialog', this.path + 'dialogs/cooccurrence.js');
    CKEDITOR.dialog.add('followedByDialog', this.path + 'dialogs/followedBy.js');
    CKEDITOR.dialog.add('precededByDialog', this.path + 'dialogs/precededBy.js');
    CKEDITOR.dialog.add('iffCooccurrenceDialog', this.path + 'dialogs/iffCooccurrence.js');
    CKEDITOR.dialog.add('singlePeriodDialog', this.path + 'dialogs/singlePeriod.js');
    CKEDITOR.dialog.add('dependenciesDialog', this.path + 'dialogs/dependencies.js');

    editor.on('doubleclick', function(evt) {
      if (editor.config.isReadOnly) {
        evt.cancel();
        return;
      }

      console.log(editor);
      var element = CKEDITOR.plugins.link.getSelectedLink(editor) || evt.data.element;

      if (!element.isReadOnly()) {
        if (element.getAttribute('data-type') == 'CooccurInvar') {
          evt.data.dialog = 'cooccurrenceDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'FollowCooccurInvar') {
          evt.data.dialog = 'followedByDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'PrecedeCooccurInvar') {
          evt.data.dialog = 'precededByDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'IffCooccurInvar') {
          evt.data.dialog = 'iffCooccurrenceDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'SinglePeriodInvar') {
          evt.data.dialog = 'singlePeriodDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'dependencies') {
          evt.data.dialog = 'dependenciesDialog';
          editor.getSelection().selectElement(element);
        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor, element)) {
          evt.data.dialog = 'anchor';
        }
      }
    });

    var config = editor.config;
    var charts = [];
    charts[0] = ['cooccurrence', 'Insert Co-occurrence', 'Co-occurrence'];
    charts[1] = ['followedBy', 'Insert Followed By', 'Followed By'];
    charts[2] = ['precededBy', 'Insert Preceded By', 'Preceded By'];
    charts[3] = ['iffCooccurrence', 'Insert IFF Co-occurrence', 'IFF Co-occurrence'];
    charts[4] = ['singlePeriod', 'Insert Single Period', 'Single Period'];
    charts[5] = ['dependencies', 'Insert Dependencies', 'Dependencies'];
    editor.ui.addRichCombo('invariant', {
      label: 'Invariant Mining',
      toolbar: 'analytics',
      // title :'Insert tokens',
      // voiceLabel : 'Insert tokens',
      // className : 'cke_format',
      multiSelect: false,
      voiceLabel: 'a',
      // paneltitle: 'a',
      panel: {
        title: 'gg',
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
        if (value == 'cooccurrence') {
          editor.execCommand('cooccurrence');
        } else if (value == 'followedBy') {
          editor.execCommand('followedBy');
        } else if (value == 'precededBy') {
          editor.execCommand('precededBy');
        } else if (value == 'iffCooccurrence') {
          editor.execCommand('iffCooccurrence');
        } else if (value == 'singlePeriod') {
          editor.execCommand('singlePeriod');
        } else if (value == 'dependencies') {
          editor.execCommand('dependencies');
        }
      }
   });
  }
});
