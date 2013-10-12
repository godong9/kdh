var EventEmitter = require('events').EventEmitter;
var mysql_conn = require('../sql/mysql_server').mysql_conn;

/*
 * GET get_book_list
 * params : school_idx
 */
exports.get_book_list = function(req, res){
	var evt = new EventEmitter();
	var dao_b = require('../sql/book_sql');
	var result = {};

	var school_idx = req.session.school_idx;

	var params = { 
		school_idx: school_idx
	}

	dao_b.dao_get_book_list(evt, mysql_conn, params);
	evt.on('get_book_list', function(err, rows){
		result = rows;
		res.send(result);
	});
};

/*
 * POST set_book
 * params : title, author, publisher, edition, condition, price, email, school_idx
 */
exports.set_book = function(req, res){
	var evt = new EventEmitter();
	var dao_b = require('../sql/book_sql');
	var result = {};

	var title = req.body.title;
	var author = req.body.author;
	var publisher = req.body.publisher;
	var edition = req.body.edition;
	var condition = req.body.condition;
	var price = req.body.price;
	var email = req.session.email;
	var school_idx = req.session.school_idx;

	var params = { 
		title: title,
		author: author,
		publisher: publisher,
		edition: edition,
		condition: condition,
		price: price,
		email: email,
		school_idx: school_idx
	}

	dao_b.dao_set_book(evt, mysql_conn, params);
	evt.on('set_book', function(err, rows){
		console.log(email);
		result = { result:"success", msg:"Set Success" };
		res.send(result);
	});
};