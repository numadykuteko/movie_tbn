var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var compression = require('compression');

var app = express();
app.use(compression());

app.use(session({
  secret: 'prox foxcorn tv 02121995',
  resave: false,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 1000,
}));

// set env
app.set('env', 'production');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main router
var indexRouter = require('./routes/index');
var detailRouter = require('./routes/detail');
var searchRouter = require('./routes/search');

app.use('/', indexRouter);
app.use('/filter', indexRouter);
app.use('/detail', detailRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (req.app.get('env') === 'development') {
    res.locals.message = err.message;
    res.locals.error = err;
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  } else {
    res.render( 'error_page', {message: "Ops. Something when wrong."});
  }
  
});

module.exports = app;
