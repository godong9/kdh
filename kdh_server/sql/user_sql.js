// dao_check_email
// params['email']
exports.dao_check_email = function(evt, mysql_conn, params){
	var sql = "SELECT COUNT(*) AS `cnt` ";
	sql += "FROM `user` AS `A` ";
	sql += "WHERE `A`.`email` = '"+params['email']+"' ";

	var query = mysql_conn.query(sql, function(err, rows, fields) {
		evt.emit('check_email', err, rows);
	});
	return sql;
}

// dao_join
// params['email']
// params['pw']
// params['phone']
// params['school_idx']
exports.dao_join = function(evt, mysql_conn, params){
	var sql = "INSERT INTO `user` ";
	sql += "SET `email` = '"+params['email']+"', ";
	sql += "`pw` = md5('"+params['pw']+"'), ";
	sql += "`phone` = '"+params['phone']+"', ";
	sql += "`school_idx` = '"+params['school_idx']+"' ";
	
	var query = mysql_conn.query(sql, function(err, rows, fields) {
		evt.emit('join', err, rows);
	});
	return sql;
}

// dao_login
// params['email']
// params['pw']
exports.dao_login = function(evt, mysql_conn, params){
	var sql = "SELECT `A`.`email`, ";
	sql += "`A`.`pw`, ";
	sql += "`A`.`phone`, ";
	sql += "`A`.`school_idx`, ";
	sql += "md5('"+params['pw']+"') AS `input_pw` ";
	sql += "FROM `user` AS `A` ";
	sql += "WHERE `A`.`email` = '"+params['email']+"' ";

	var query = mysql_conn.query(sql, function(err, rows, fields) {
		evt.emit('login', err, rows);
	});
	return sql;
}

// dao_get_user_info
// params['book_idx']
exports.dao_get_user_info = function(evt, mysql_conn, params){
	var sql = "SELECT `A`.`email`, ";
	sql += "`A`.`phone` ";
	sql += "FROM `user` AS `A` ";
	sql += "INNER JOIN `book` AS `B` ";
	sql += "ON `A`.`email` = `B`.`email` ";
	sql += "WHERE `B`.`book_idx` = '"+params['book_idx']+"' ";

	var query = mysql_conn.query(sql, function(err, rows, fields) {
		evt.emit('get_user_info', err, rows);
	});
	return sql;
}

