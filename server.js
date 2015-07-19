var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  layout: false,
  partialsDir: [ 'views/partials/' ]
});

app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/js', express.static('js'));
app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);
app.enable('view cache');
app.locals.layout = false;

app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
  res.render('main', {title:'Home', param:'f'});
});

app.listen(8080);
