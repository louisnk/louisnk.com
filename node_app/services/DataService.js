var rr = require("recursive-readdir");
// var utilities = require("UtilitiesService");

var findFiles = function(which, callback) {
	var dirs = [];

	switch (which) {
		default:
			dirs.push(path.join("..", "..", "public", "images"));
			break;
	}

	if (dirs.length > 0) {
		for (var i = dirs.length; i > 0; i--) {
			var dir = dirs[i];

			rr(dir, ["*.lesS"], function(err, files) {
				if (!err) {
					return callback(files);
				} else {
					return callback(err);
				}		
			});		
		}
	} else {
		return callback("No files found");
	}

}

var sendJSON = function(res, data) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(data);
};

var handleRequest = function(req, res) {
	
	console.log(req.params);
	console.log(req.query, req.query);

	sendJSON(res, JSON.stringify(data));
};

module.exports = {
	handleRequest: handleRequest
};