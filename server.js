var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  layout: false,
  partialsDir: [ 'views/partials/' ]
});

var userObj = null;
module.exports = function(user) {
  // Allow upper level web app to pass user information.
  userObj.name = user.name;
  userObj.id = user.id;
}

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

app.get('/', function(req, res) {
  res.render('main', {title:'Home'});
});

app.get('/templateEditor', function(req, res) {
  res.render('templateEditor');
});

app.listen(8080);
