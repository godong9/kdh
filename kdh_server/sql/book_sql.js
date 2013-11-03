// dao_get_book_list
// params['school_idx']
exports.dao_get_book_list = function(evt, mysql_conn, params){
	var sql = "SELECT `A`.`book_idx`, ";
	sql += "`A`.`isbn`, ";
	sql += "`A`.`title`, ";
	sql += "`A`.`author`, ";
	sql += "`A`.`publisher`, ";
	sql += "`A`.`edition`, ";
	sql += "`A`.`condition`, ";
	sql += "`A`.`price`, ";
	sql += "`A`.`email`, ";
	sql += "`A`.`school_idx`, ";
	sql += "`A`.`sell` ";
	sql += "FROM `book` AS `A` ";
	sql += "WHERE `A`.`school_idx` = '"+params['school_idx']+"' ";
	sql += "AND `A`.`sell` = '0' ";
	sql += "ORDER BY `A`.`reg_date` DESC";

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
	sql += "SET `isbn` = '"+params['isbn']+"', ";
	sql += "`title` = '"+params['title']+"', ";
	sql += "`author` = '"+params['author']+"', ";
	sql += "`publisher` = '"+params['publisher']+"', ";
	sql += "`edition` = '"+params['edition']+"', ";
	sql += "`condition` = '"+params['condition']+"', ";
	sql += "`price` = '"+params['price']+"', ";
	sql += "`email` = '"+params['email']+"', ";
	sql += "`school_idx` = '"+params['school_idx']+"'";

	var query = mysql_conn.query(sql, params, function(err, rows, fields) {
		
		var s_sql = "SELECT `A`.`book_idx` ";
		s_sql += "FROM `book` AS `A` ";
		s_sql += "WHERE `A`.`title` = '"+params['title']+"' ";
		s_sql += "AND `A`.`email` = '"+params['email']+"' ";
		s_sql += "ORDER BY `A`.`book_idx` DESC LIMIT 1";

		var s_query = mysql_conn.query(s_sql, params, function(err, rows, fields) {
			
			evt.emit('set_book', err, rows);

			var img_str = rows[0].book_idx + ".jpg";
			var u_sql = "UPDATE `book` ";
			u_sql += "SET `img` = '"+img_str+"' "; 
			u_sql += "WHERE `title` = '"+params['title']+"' ";
			u_sql += "AND `email` = '"+params['email']+"' ";

			var u_query = mysql_conn.query(u_sql, params, function(err, rows, fields) {
				console.log("Image Name Update!");		
			});
		});
	});
}

// dao_set_sell_book
// params['book_idx']
exports.dao_set_sell_book = function(evt, mysql_conn, params){
	
	var sql = "UPDATE `book` ";
	sql += "SET `sell` = '1' "; 
	sql += "WHERE `book_idx` = '"+params['book_idx']+"' ";

	var query = mysql_conn.query(sql, params, function(err, rows, fields) {
		console.log("Book Sell!");		
		evt.emit('set_sell_book', err, rows);
	});
}
