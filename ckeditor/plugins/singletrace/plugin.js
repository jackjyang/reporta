CKEDITOR.plugins.add('singletrace', {
  init: function(editor) {
    editor.addCommand('bufferState', new CKEDITOR.dialogCommand('bufferStateDialog'));
    editor.addCommand('arrivalCurve', new CKEDITOR.dialogCommand('arrivalCurveDialog'));
    editor.addCommand('ecdf', new CKEDITOR.dialogCommand('ecdfDialog'));
    editor.addCommand('frequencyHeatmap', new CKEDITOR.dialogCommand('frequencyHeatmapDialog'));
    editor.addCommand('regularityHeatmap', new CKEDITOR.dialogCommand('regularityHeatmapDialog'));
    editor.addCommand('eventRuntimeJitter', new CKEDITOR.dialogCommand('eventRuntimeJitterDialog'));
    editor.addCommand('processStateAnalytics', new CKEDITOR.dialogCommand('processStateAnalyticsDialog'));
    editor.addCommand('systemIdleTime', new CKEDITOR.dialogCommand('systemIdleTimeDialog'));

    CKEDITOR.dialog.add('bufferStateDialog', this.path + 'dialogs/bufferState.js');
    CKEDITOR.dialog.add('arrivalCurveDialog', this.path + 'dialogs/arrivalCurve.js');
    CKEDITOR.dialog.add('ecdfDialog', this.path + 'dialogs/ecdf.js');
    CKEDITOR.dialog.add('frequencyHeatmapDialog', this.path + 'dialogs/frequencyHeatmap.js');
    CKEDITOR.dialog.add('regularityHeatmapDialog', this.path + 'dialogs/regularityHeatmap.js');
    CKEDITOR.dialog.add('eventRuntimeJitterDialog', this.path + 'dialogs/eventRuntimeJitter.js');
    CKEDITOR.dialog.add('processStateAnalyticsDialog', this.path + 'dialogs/processStateAnalytics.js');
    CKEDITOR.dialog.add('systemIdleTimeDialog', this.path + 'dialogs/systemIdleTime.js');

    editor.on('doubleclick', function(evt) {
      var element = CKEDITOR.plugins.link.getSelectedLink(editor) || evt.data.element;

      if (!element.isReadOnly()) {
        if (element.getAttribute('data-type') == 'bufferState') {
          evt.data.dialog = 'bufferStateDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'ArrivalCurve') {
          evt.data.dialog = 'arrivalCurveDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'ecdf') {
          evt.data.dialog = 'ecdfDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'frequencyHeatmap') {
          evt.data.dialog = 'frequencyHeatmapDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'regularityHeatmap') {
          evt.data.dialog = 'regularityHeatmapDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'EventRuntimeJitter') {
          evt.data.dialog = 'eventRuntimeJitterDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'processStateAnalytics') {
          evt.data.dialog = 'processStateAnalyticsDialog';
          editor.getSelection().selectElement(element);
        } else if (element.getAttribute('data-type') == 'systemIdleTime') {
          evt.data.dialog = 'systemIdleTimeDialog';
          editor.getSelection().selectElement(element);
        } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor, element)) {
          evt.data.dialog = 'anchor';
        }
      }
    });

    var config = editor.config;
    var charts = [];
    charts[0] = ['bufferState', 'Insert Buffer State', 'Buffer State'];
    charts[1] = ['arrivalCurve', 'Insert Arrival Curve', 'Arrival Curve'];
    charts[2] = ['ecdf', 'Insert ECDF', 'ECDF'];
    charts[3] = ['frequencyHeatmap', 'Insert Frequency Heatmap', 'Frequency Heatmap'];
    charts[4] = ['regularityHeatmap', 'Insert Regularity Heatmap', 'Regularity Heatmap'];
    charts[5] = ['eventRuntimeJitter', 'Insert Event and Runtime Jitter', 'Event and Runtime Jitter'];
    charts[6] = ['processStateAnalytics', 'Insert Process State Analytics', 'Process State Analytics'];
    charts[7] = ['systemIdleTime', 'Insert System Idle Time', 'System Idle Time'];
    editor.ui.addRichCombo('singletrace', {
      label: 'Custom Single-Trace Analytics',
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
        if (value == 'bufferState') {
          editor.execCommand('bufferState');
        } else if (value == 'arrivalCurve') {
          editor.execCommand('arrivalCurve');
        } else if (value == 'ecdf') {
          editor.execCommand('ecdf');
        } else if (value == 'frequencyHeatmap') {
          editor.execCommand('frequencyHeatmap');
        } else if (value == 'regularityHeatmap') {
          editor.execCommand('regularityHeatmap');
        } else if (value == 'eventRuntimeJitter') {
          editor.execCommand('eventRuntimeJitter');
        } else if (value == 'processStateAnalytics') {
          editor.execCommand('processStateAnalytics');
        } else if (value == 'systemIdleTime') {
          editor.execCommand('systemIdleTime');
        }
      }
   });
  }
});
