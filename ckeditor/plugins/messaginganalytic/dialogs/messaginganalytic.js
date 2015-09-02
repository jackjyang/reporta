CKEDITOR.dialog.add( 'messagingAnalyticDialog', function( editor ) {
    return {
        title: 'Messaging Analytic Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: '',
                elements: [
                    {
                        type: 'iframe',
                        src: '/ckeditor/genericplaceholder/placeholder.html',
                        width: '100%',
                        height: '100%'
                    }
                ]
            }
        ],

        onOk: function() {
            var dialog = this;

            var chart = editor.document.createElement( 'img' );

            chart.setAttribute('src', '/ckeditor/genericplaceholder/placeholder.png');
            chart.setAttribute('style', 'width: 150px; height: 150px;');
            chart.setAttribute('data-analytictype', 'messaginganalytic');

            editor.insertElement( chart );
        }
    };
});