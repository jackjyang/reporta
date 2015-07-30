CKEDITOR.dialog.add( 'chartDialog', function( editor ) {
    return {
        title: 'Chart Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'name',
                        label: 'Chart Name',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Chart name cannot be empty." )
                    },
                    {
                        type: 'select',
                        id: 'type',
                        label: 'Type of Chart',
                        items: [ [ '' ], [ 'Bar' ], [ 'Graph' ], [ 'Pie' ] ],
                        'default': '',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Chart type cannot be empty." )
                    }
                ]
            },
            {
                id: 'tab-adv',
                label: 'Advanced Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id'
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;

            var chart = editor.document.createElement( 'img' );

            chart.setAttribute('src', 'http://www.keenthemes.com/preview/metronic/theme/assets/global/plugins/jcrop/demos/demo_files/image1.jpg');
            chart.setAttribute('alt', '');
            chart.setAttribute('style', 'width: 50px; height: 33px;');
            chart.setAttribute('type', 'chart');
            chart.setAttribute('name', dialog.getValueOf( 'tab-basic', 'name'));
            chart.setAttribute('type', dialog.getValueOf( 'tab-basic', 'type'));

            editor.insertElement( chart );
        }
    };
});