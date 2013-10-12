/*
 * GET login test
 */

exports.join = function(req, res){
  res.render('test_join', { title: 'Express' });
};

exports.login = function(req, res){
  res.render('test_login', { title: 'Express' });
};

exports.set_book = function(req, res){
  res.render('test_set_book', { title: 'Express' });
};

exports.get_user_info = function(req, res){
  res.render('test_get_user_info', { title: 'Express' });
};