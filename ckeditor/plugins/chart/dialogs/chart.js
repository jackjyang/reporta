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
                        id: 'chart',
                        label: 'Chart',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Chart field cannot be empty." )
                    },
                    {
                        type: 'text',
                        id: 'title',
                        label: 'Explanation',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." )
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

            var chart = editor.document.createElement( 'chart' );
            chart.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
            chart.setText( '<script>alert(\'cross site scripting attack\')</script>' );

            var id = dialog.getValueOf( 'tab-adv', 'id' );
            if ( id )
                chart.setAttribute( 'id', id );

            editor.insertElement( chart );
        }
    };
});