var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  layout: false,
  partialsDir: [ 'views/partials/' ]
});

var userObj = null;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '639034003280-d800g8nadmhjr1h9n9gva90h2iop8ah4.apps.googleusercontent.com',
    clientSecret: 'A80N_Cb4W0WfAnZ-6fnZmY9V',
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  userObj = user;
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/login',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

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
  res.render('main', {title:'Home', user:userObj});
});

app.get('/logout', function(req, res) {
  userObj = null;
  res.redirect('/');
  // res.render('main', {title:'Home', user:userObj});
});

app.listen(8080);
