CKEDITOR.plugins.add('basic', {
  init: function(editor) {
    editor.addCommand('interruptAnalytics', new CKEDITOR.dialogCommand('interruptAnalyticsDialog'));
    editor.addCommand('messagingAnalytics', new CKEDITOR.dialogCommand('messagingAnalyticsDialog'));
    editor.addCommand('errorAnalytics', new CKEDITOR.dialogCommand('errorAnalyticsDialog'));
    editor.addCommand('performance', new CKEDITOR.dialogCommand('performanceDialog'));

    CKEDITOR.dialog.add('interruptAnalyticsDialog', this.path + 'dialogs/interruptAnalytics.js');
    CKEDITOR.dialog.add('messagingAnalyticsDialog', this.path + 'dialogs/messagingAnalytics.js');
    CKEDITOR.dialog.add('errorAnalyticsDialog', this.path + 'dialogs/errorAnalytics.js');
    CKEDITOR.dialog.add('performanceDialog', this.path + 'dialogs/performance.js');

    editor.on('doubleclick', function(evt) {
      var element = CKEDITOR.plugins.link.getSelectedLink(editor) || evt.data.element;

      if (!element.isReadOnly()) {
        if (element.getAttribute('data-type') == 'interruptAnalytics') {
          evt.data.dialog = 'interruptAnalyticsDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'messagingAnalytics') {
          evt.data.dialog = 'messagingAnalyticsDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'errorAnalytics') {
          evt.data.dialog = 'errorAnalyticsDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'performance') {
          evt.data.dialog = 'performanceDialog';
          editor.getSelection().selectElement(element);
        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor, element)) {
          evt.data.dialog = 'anchor';
        }
      }
    });

    var config = editor.config;
    var charts = [];
    charts[0] = ['interruptAnalytics', 'Insert Interrupt Analytic', 'Interrupt Analytic'];
    charts[1] = ['messagingAnalytics', 'Insert Messaging Analytic', 'Messaging Analytic'];
    charts[2] = ['errorAnalytics', 'Insert Error Analytic', 'Error Analytic'];
    charts[3] = ['performance', 'Insert Performance Analytic', 'Performance Analytic'];
    editor.ui.addRichCombo('basic', {
      label: 'Basic Analytic',
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
        if (value == 'interruptAnalytics') {
          editor.execCommand('interruptAnalytics');
        } else if (value == 'errorAnalytics') {
          editor.execCommand('errorAnalytics');
        } else if (value == 'messagingAnalytics') {
          editor.execCommand('messagingAnalytics');
        } else if (value == 'performance') {
          editor.execCommand('performance');
        }
      }
   });
  }
});
