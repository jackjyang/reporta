CKEDITOR.dialog.add( 'singletraceDialog', function( editor ) {
    return {
        title: 'Single Trace Analytic Properties',
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
                        id: 'type',
                        label: 'Type of Analytic',
                        items: [ [ '' ], [ 'Buffer State' ], [ 'Arrival Curve' ], [ 'ECDF' ], [ 'Frequency Heatmap' ], [ 'Regularity Heatmap' ], [ 'Event and Runtime Jitter' ], [ 'Process State Analytics' ], [ 'System Idle Time' ] ],
                        'default': '',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Analytic type cannot be empty." ),
                        setup: function( element ) {
                            this.setValue( element.getAttribute( "analytictype" ) );
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

            chart.setAttribute('src', '/ckeditor/plugins/singletrace/icons/placeholder.jpg');
            chart.setAttribute('style', 'width: 50px; height: 33px;');
            chart.setAttribute('name', dialog.getValueOf( 'tab-basic', 'name'));
            chart.setAttribute('type', 'singletrace');
            chart.setAttribute('analytictype', dialog.getValueOf( 'tab-basic', 'type'));

            editor.insertElement( chart );
        }
    };
});