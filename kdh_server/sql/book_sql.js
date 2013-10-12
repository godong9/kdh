// dao_get_book_list
// params['school_idx']
exports.dao_get_book_list = function(evt, mysql_conn, params){
	var sql = "SELECT `A`.`book_idx`, ";
	sql += "`A`.`title`, ";
	sql += "`A`.`author`, ";
	sql += "`A`.`publisher`, ";
	sql += "`A`.`edition`, ";
	sql += "`A`.`condition`, ";
	sql += "`A`.`price`, ";
	sql += "`A`.`email`, ";
	sql += "`A`.`school_idx` ";
	sql += "FROM `book` AS `A` ";
	sql += "WHERE `A`.`school_idx` = '"+params['school_idx']+"' ";

	var query = mysql_conn.query(sql, function(err, rows, fields) {
		evt.emit('get_book_list', err, rows);
	});
	return sql;
}

// dao_set_book
// params['title']
// params['author']
// params['publisher']
// params['edition']
// params['condition']
// params['price']
// params['email']
// params['school_idx']
exports.dao_set_book = function(evt, mysql_conn, params){
	var sql = "INSERT INTO `book` ";
	sql += "SET `title` = '"+params['title']+"', ";
	sql += "`author` = '"+params['author']+"', ";
	sql += "`publisher` = '"+params['publisher']+"', ";
	sql += "`edition` = '"+params['edition']+"', ";
	sql += "`condition` = '"+params['condition']+"', ";
	sql += "`price` = '"+params['price']+"', ";
	sql += "`email` = '"+params['email']+"', ";
	sql += "`school_idx` = '"+params['school_idx']+"'";
	var query = mysql_conn.query(sql, params, function(err, rows, fields) {
		evt.emit('set_book', err, rows);
	});
}
