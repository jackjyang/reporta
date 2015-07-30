require('./db_init');

var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  layout: false,
  partialsDir: [ 'views/partials/' ]
});

var routes = require('./routes/index');
var api = require('./routes/api');

// TODO: Allow upper level web app to pass user information.
var userInfo = { name: 'demo', id: 'abc123' };
app.set('userInfo', userInfo);

app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/js', express.static('js'));
app.use('/ckeditor', express.static('ckeditor'))
app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);
app.enable('view cache');
app.locals.layout = false;

app.set('views', path.join(__dirname, 'views'));


// Set routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/api/:action/:data', api.handler);


// TODO: remove this.
app.get('/templateEditor', function(req, res) {
  res.render('templateEditor');
});

app.listen(8080);
