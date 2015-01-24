var rr = require("recursive-readdir");
// var utilities = require("UtilitiesService");

var findFiles = function(which, callback) {
	
	var baseDir = path.join("..", "..", "public");

	switch (which) {
		case "code":
			dirs.push(path.join(baseDir, "images", "code"), 
					  		path.join(baseDir, "json", "code"));
			break;

		case "home":
			dirs.push(path.join(baseDir, "json", "home"),
								path.join(baseDir, "images", "home"));
			break;

		default:
			dirs.push(path.join(baseDir, "images"));
			break;
	}

	if (dirs.length > 0) {
		for (var i = dirs.length; i > 0; i--) {
			var dir = dirs[i];

			rr(dir, ["frame-bg.*"], function(err, files) {
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
	console.log(req.query);


	sendJSON(res, JSON.stringify(data));
};

module.exports = {
	handleRequest: handleRequest
};