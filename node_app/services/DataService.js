var rr = require("recursive-readdir");
var Utils = require("./UtilitiesService");

var findModelFor = function(which, ids, callback) {

	var baseDir = path.join(__dirname, "..", "..", "public");
	var dir;

	var getJson = function(page, cb) {
		fs.readFile(path.join(baseDir, "json", page + ".json"), {encoding: "utf8"}, 
			function(err, contents) {
				if (!err) { 
					return cb(contents);
				} else {
					console.error(err);
				}
			});
	};

	switch (which) {
		case "art":
		case "code":
		case "home":
		case "life":
		case "projects":
			dir = path.join(baseDir, "images", which);
			break;

		default:
			dir = path.join(baseDir, "images");
			break;
	}

	if (dir) {
		fs.readdir(dir, function(err, imgs) {
			if (!err) { 
				getJson(which, function(json) {
					return callback(Utils.combineJson(dir, imgs, json));
				});
			} else {
				return callback("Failed to read " + dir + 
								" \n Most likely it doesn't exist.");
			}
		});
	} else {
		return callback("No files found");
	}

};

var sendJSON = function(res, data) {
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.end(data);
};

var handleRequest = function(req, res) {
	var which = req.params[0];
	var ids = req.query.ids || false;

	if (req.query["location"]) {
		Utils.recordUserDetails(JSON.parse(decodeURIComponent(req.query["location"])));
	}

	findModelFor(which, ids, function(model) {
		if (model && typeof model !== "string")	 {
			sendJSON(res, JSON.stringify(model));
		} else {
			sendJSON(res, JSON.stringify({ error: model }));
		}
	});
};

module.exports = {
	handleRequest: handleRequest
};