CKEDITOR.dialog.add('headerDialog', function(editor) {
  return {
    title: 'Insert Header',
    minWidth: 400,
    minHeight: 100,
    contents: [{
      id: 'tab-header',
      label: '',
      elements: [{
        type: 'textarea',
        id: 'header-value',
        label: 'Header',
        setup: function(element) {
          this.setValue(element.getAttribute('header-value'));
        }
      }]
    }],

    onShow: function() {
      this.setValueOf('tab-header', 'header-value', editor.config.customConfig.valueOf['headerValue']);
    },

    onOk: function() {
      var headerValue = this.getValueOf('tab-header', 'header-value');
      editor.config.customConfig.valueOf['headerValue'] = headerValue;

    }
  };
});
