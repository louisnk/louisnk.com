
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: "@Louisnk - online since '97" });
};