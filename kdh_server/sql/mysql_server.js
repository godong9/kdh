var mysql      = require('mysql');
var mysql_conn = mysql.createConnection({
	host     : '211.110.61.51',
	user     : 'root',
	password : '',
	database: 'kdh'
});

module.exports = {
  mysql_conn: mysql_conn
}
