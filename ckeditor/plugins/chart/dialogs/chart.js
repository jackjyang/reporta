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
                        validate: CKEDITOR.dialog.validate.notEmpty( "Chart name cannot be empty." ),
                        setup: function( element ) {
                            this.setValue( element.getAttribute( "name" ) );
                        }
                    },
                    {
                        type: 'select',
                        id: 'chartType',
                        label: 'Type of Chart',
                        items: [ [ '' ], [ 'Bar' ], [ 'Graph' ], [ 'Pie' ] ],
                        'default': '',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Chart type cannot be empty." ),
                        setup: function( element ) {
                            this.setValue( element.getAttribute( "chartType" ) );
                        }
                    }
                ]
            }
        ],

        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();
            if ( element )
                element = element.getAscendant( 'img', true );
            if ( !element || element.getName() != 'img' ) {
                element = editor.document.createElement( 'abbr' );
                this.insertMode = true;
            }
            else
                this.insertMode = false;
            this.element = element;
            if ( !this.insertMode )
                this.setupContent( this.element );
        },

        onOk: function() {
            var dialog = this;

            var chart = editor.document.createElement( 'img' );

            chart.setAttribute('src', '/ckeditor/plugins/chart/icons/placeholder.jpg');
            chart.setAttribute('alt', '');
            chart.setAttribute('style', 'width: 50px; height: 33px;');
            chart.setAttribute('type', 'chart');
            chart.setAttribute('name', dialog.getValueOf( 'tab-basic', 'name'));
            chart.setAttribute('chartType', dialog.getValueOf( 'tab-basic', 'chartType'));

            editor.insertElement( chart );
        }
    };
});