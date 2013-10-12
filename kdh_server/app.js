
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , test = require('./test')
  , user = require('./routes/user')
  , book = require('./routes/book')
  , http = require('http')
  , path = require('path')
  , url = require('url')
  , expressValidator = require('express-validator');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// GET request
app.get('/', routes.index);
app.get('/get_book_list', book.get_book_list);
app.get('/get_user_info', user.get_user_info);

// POST request
app.post('/join', user.join);
app.post('/login', user.login);
app.post('/set_book', book.set_book);

// TEST
app.get('/test_join', test.join);
app.get('/test_login', test.login);
app.get('/test_set_book', test.set_book);
app.get('/test_get_user', test.get_user_info);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
