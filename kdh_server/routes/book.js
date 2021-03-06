var EventEmitter = require('events').EventEmitter;
var mysql_conn = require('../sql/mysql_server').mysql_conn;

/*
 * GET get_book_list
 * params : school_idx
 */
exports.get_book_list = function(req, res){
	var evt = new EventEmitter();
	var dao_b = require('../sql/book_sql');
	var result = { book:{} };

	var school_idx = req.session.school_idx;

	var params = { 
		school_idx: school_idx
	}

	dao_b.dao_get_book_list(evt, mysql_conn, params);
	evt.on('get_book_list', function(err, rows){
		result.book = rows;
		res.send(result);
	});
};

/*
 * POST set_book
 * params : isbn, title, author, publisher, edition, condition, price, email, school_idx
 */
exports.set_book = function(req, res){
	var evt = new EventEmitter();
	var dao_b = require('../sql/book_sql');
	var result = { };

	var isbn = req.body.isbn;
	var title = req.body.title;
	var author = req.body.author;
	var publisher = req.body.publisher;
	var edition = req.body.edition;
	var condition = req.body.condition;
	var price = req.body.price;
	var email = req.session.email;
	var school_idx = req.session.school_idx;

	var params = { 
		isbn: isbn,
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
		console.log(rows);
		result = rows[0];
		res.send(result);
	});
};

/*
 * POST set_sell_book
 * params : book_idx
 */
exports.set_sell_book = function(req, res){
	var evt = new EventEmitter();
	var dao_b = require('../sql/book_sql');
	var result = { };

	var isbn = req.body.book_idx;

	var params = { 
		book_idx: book_idx
	}

	dao_b.dao_set_sell_book(evt, mysql_conn, params);
	evt.on('set_sell_book', function(err, rows){
		result = { result:"success", msg:"판매 완료!" };
		res.send(result);
	});
};

