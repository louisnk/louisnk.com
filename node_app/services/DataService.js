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
				return callback(err + " No files found in the Node DataService");
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
			// TODO: handle this gracefully.
			console.error("No model found for " + which);
		}
	});
};

module.exports = {
	handleRequest: handleRequest
};