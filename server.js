require('./db_init');

var express = require('express');
var path = require('path');

var app = express();

// TODO: Allow upper level web app to pass user information.
var userInfo = { displayName: 'Demo Account', id: 'abc123' };
// app.set('userInfo', userInfo);

var serverRoute = require('./routes/server')(userInfo);
var api = require('./routes/api');

app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/js', express.static('js'));
app.use('/ckeditor', express.static('ckeditor'))
app.use('/angular', express.static('angular'))

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.get('/', serverRoute.index);
app.get('/partials/:name', serverRoute.partials);
app.get('/api/:request', api.handler);

// TODO: remove this.
app.get('/templateEditor', function(req, res) {
  res.render('templateEditor');
});

// Redirect everything else to the index
app.get('*', serverRoute.index);

app.listen(8080);
