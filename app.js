var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var i18n = require('./lib/i18n');
const i18n = require("i18n");
i18n.configure({
    locales:['en', 'es'],
    defaultLocale:  'es',
    directory: __dirname + '/locales',
    queryParameter: 'lang',
    autoReload: true,
    syncFiles: true,
    register: global
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


require('./lib/connectMongoose');
require('./models/Anuncio');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/anuncios/images',express.static('public/images'));

app.use('/', index);
app.use('/users', users);
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));

app.use(i18n.init);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  var err = new Error(__('not_found'));
  err.status = 404;
  next(err);
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.use(function(err, req, res, next) {
  
    if (err.array) { // validation error
      err.status = 422;
      const errInfo = err.array({ onlyFirstError: true })[0];
      err.message = isAPI(req) ?
        { message: 'Not valid', errors: err.mapped()}
        : `Not valid - ${errInfo.param} ${errInfo.msg}`;
    }
  
    res.status(err.status || 500);
  
    // si es una petición al API respondo JSON...
    if (isAPI(req)) {
      res.json({ success: false, error: err.message });
      return;
    }
  
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.render('error');
  });
  function isAPI(req) {
    return req.originalUrl.indexOf('/api') === 0;
  }

module.exports = app;
