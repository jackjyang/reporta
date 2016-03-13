CKEDITOR.dialog.add('iffCooccurrenceDialog', function(editor) {
  return {
    title: 'IFF Co-Occurrence Properties',
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
      },
      {
        type: 'text',
        id: 'data-height',
        label: 'Height of Chart (in px)',
        setup: function(element) {
          var height = element.getStyle('height');
          this.setValue(height.substring(0, height.length - 2));
        }
      },
      {
        type: 'text',
        id: 'data-width',
        label: 'Width of Chart (in px)',
        setup: function(element) {
          var width = element.getStyle('width');
          this.setValue(width.substring(0, width.length - 2));
        }
      }]
    }],
    onShow: function() {
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      if (element && element.getName() != 'img') {
        this.insertMode = true;
      } else {
        this.insertMode = false;
        this.element = element;
        this.setupContent(this.element);
      }
    },
    onOk: function() {
      var dialog = this;
      var chart = editor.document.createElement('img');
      var id;
      var height = dialog.getValueOf('tab-basic', 'data-height');
      var width = dialog.getValueOf('tab-basic', 'data-width');

      if (height == '' || (isNaN(height) && isNaN(height.substring(height.length - 2, 2)))) {
        height  = '150px';
      } else {
        if (height.length < 2 || height.substring(height.length - 2, 2) != 'px') {
          height = height + 'px';
        }
      }
      if (width == '' || (isNaN(width) && isNaN(width.substring(width.length - 2, 2)))) {
        width  = '150px';
      } else {
        if (width.length < 2 || width.substring(width.length - 2, 2) != 'px') {
          width = width + 'px';
        }
      }

      chart.setAttribute('src', '/ckeditor/genericplaceholder/placeholder.png');
      chart.setStyle('height', height);
      chart.setStyle('width', width);
      if (this.insertMode) {
        id = counter++;
      } else {
        id = this.element.getAttribute('data-id');
      }
      chart.setAttribute('data-id', id);
      chart.setAttribute('data-name', dialog.getValueOf('tab-basic', 'data-name'));
      chart.setAttribute('data-desc', dialog.getValueOf('tab-basic', 'data-desc'));
      chart.setAttribute('data-type', 'IffCooccurInvar');
      editor.insertElement(chart);
    }
  };
});
