var sendJSON = function(res, data) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(data);
};

var handleRequest = function(req, res) {
	
	console.log(req.params);
	var data = {
		test: "testing"
	};

	sendJSON(res, JSON.stringify(data));
};

module.exports = {
	handleRequest: handleRequest
};