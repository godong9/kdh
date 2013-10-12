var EventEmitter = require('events').EventEmitter;
var mysql_conn = require('../sql/mysql_server').mysql_conn;

/*
 * Register session
 */
function register_session(req, email, phone, school_idx){
	req.session.email = email;
	req.session.phone = phone;
	req.session.school_idx = school_idx;
}

/*
 * POST join
 * params : email, pw, phone, school_idx 
 */
exports.join = function(req, res){
	var evt = new EventEmitter();
	var dao_u = require('../sql/user_sql');
	var result = {};

	var email = req.body.email;
	var pw = req.body.pw;
	var phone = req.body.phone;
	var school_idx = req.body.school_idx;
	
	console.log("params: "+email+"//"+pw+"//"+phone+"//"+school_idx);

	var params = { email: email }
	dao_u.dao_check_email(evt, mysql_conn, params);

	evt.on('check_email', function(err, rows){
		if(err)
		{
			throw err;
		}

		if( rows[0].cnt === 0 )
		{
			var params = {
						email: email,
						pw: pw,
						phone: phone,
						school_idx: school_idx
			};
			dao_u.dao_join(evt, mysql_conn, params);
		}
		else
		{
			result = { result:"fail", msg:"사용 중인 email입니다!" };
			res.send(result);
		}
	});

	evt.on('join', function(err, rows){
		console.log("Join Success");
		register_session(req, email, phone, school_idx);

		result = { result:"success", msg:"Join Success" };
		res.send(result);
	});
};

/*
 * POST login
 * params : email, pw
 */
exports.login = function(req, res){
	var evt = new EventEmitter();
	var dao_u = require('../sql/user_sql');
	var result = {};

	var email = req.body.email;
	var pw = req.body.pw;

	var params = { 
		email: email, 
		pw: pw 
	}

	dao_u.dao_login(evt, mysql_conn, params);
	evt.on('login', function(err, rows){
		if(err)
		{
			throw err;
		}
			
		if( rows.length < 1 )
		{
			result = { result:"fail", msg:"email 또는 비밀번호가 잘못되었습니다!" };
			res.send(result);
		}
		else if( rows[0].pw !== rows[0].input_pw )
		{
			result = { result:"fail", msg:"email 또는 비밀번호가 잘못되었습니다!" };
			res.send(result);
		}
		else if( rows[0].pw === rows[0].input_pw )
		{
			register_session(req, rows[0].email, rows[0].phone, rows[0].school_idx);
			console.log("Register Session -> "+req.session.email);

			result = { result:"success", msg:"로그인 성공!" };
			res.send(result);
		}
	});
};

/*
 * GET user_info
 * params : book_idx
 */
exports.get_user_info = function(req, res){
	var evt = new EventEmitter();
	var dao_u = require('../sql/user_sql');
	var result = {};

	var book_idx = req.query.book_idx;

	var params = { 
		book_idx: book_idx
	}

	dao_u.dao_get_user_info(evt, mysql_conn, params);
	evt.on('get_user_info', function(err, rows){
		result = rows;
		res.send(result);
	});
};