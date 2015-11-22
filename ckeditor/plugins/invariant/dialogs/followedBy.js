CKEDITOR.dialog.add('followedByDialog', function(editor) {
  return {
    title: 'Followed By Properties',
    minWidth: 400,
    minHeight: 200,
    contents: [{
      id: 'tab-basic',
      label: '',
      elements: [{
        type: 'text',
        id: 'data-name',
        label: 'Chart Name',
        validate: CKEDITOR.dialog.validate.notEmpty("Chart name cannot be empty."),
        setup: function(element) {
          this.setValue(element.getAttribute("data-name"));
        }
      },
      {
        type: 'text',
        id: 'data-desc',
        label: 'Description',
        setup: function(element) {
          this.setValue(element.getAttribute("data-desc"));
        }
      }]
    }],
    onShow: function() {
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      if (element) {
        this.insertMode = true;
        this.element = element;
        this.setupContent(this.element);
      } else {
        this.insertMode = false;
      }
    },
    onOk: function() {
      var dialog = this;
      var chart = editor.document.createElement('img');

      chart.setAttribute('src', '/ckeditor/genericplaceholder/placeholder.png');
      chart.setAttribute('style', 'width: 150px; height: 150px;');
      chart.setAttribute('data-name', dialog.getValueOf('tab-basic', 'data-name'));
      chart.setAttribute('data-desc', dialog.getValueOf('tab-basic', 'data-desc'));
      chart.setAttribute('data-type', 'FollowCooccurInvar');
      editor.insertElement(chart);
    }
  };
});
