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
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
//파일 업로드 관련 설정
app.use(express.limit('10mb'));
app.use(express.bodyParser({uploadDir: __dirname + '/tmp'})); 
app.use(express.methodOverride());
app.use(express.logger({ buffer: 5000 }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// GET request
app.get('/get_book_list', book.get_book_list);
app.get('/get_user_info', user.get_user_info);
app.get('/get_my_page_list', user.get_my_page_list);
app.get('/img', function(req, res){	//이미지 파일 다운로드
	var url_parts = url.parse(req.url, true); // url 파싱
	var query = url_parts.query; // 쿼티로드 (ex> { id: 'zz3', a: '1', b: '2' } )
	var img_str = query.img_str;
	var file = __dirname + '/public/upload/' + img_str;
	res.download(file); // Set disposition and send it.
});

// POST request
app.post('/join', user.join);
app.post('/login', user.login);
app.post('/set_book', book.set_book);
//파일 업로드 관련
app.post('/upload', routes.upload);
// facebook login & join
app.post('/join_fb', user.join_fb);
app.post('/login_fb', user.login_fb);

// TEST
app.get('/test_join', test.join);
app.get('/test_login', test.login);
app.get('/test_set_book', test.set_book);
app.get('/test_get_user', test.get_user_info);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

