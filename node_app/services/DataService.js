var Utils = require("./UtilitiesService");
var STATE = global.constants.STATE;

module.exports = {
	findModelFor: function(which, ids, mobile, callback) {
		mobile = mobile || false;

		var baseDir = path.join(__dirname, "..", "..", "public"),
				getJson = this.getJson.bind(this, baseDir),
				dir;

		switch (which) {
			case STATE.ART.toLowerCase():
			case STATE.CODE.toLowerCase():
			case STATE.HOME.toLowerCase():
			case STATE.LIFE.toLowerCase():
			case STATE.PROJECTS.toLowerCase():
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
						json = mobile ? json.mobile : json.desktop;
						return callback(Utils.combineJson(dir, imgs, json, which));
					});
				} else {
					return callback("Failed to read " + dir + 
									" \n Most likely it doesn't exist.");
				}
			});
		} else {
			return callback("No files found");
		}

	},

	getJson: function(baseDir, page, callback) {
		fs.readFile(path.join(baseDir, "json", page + ".json"), {encoding: "utf8"}, 
			function(err, contents) {
				if (!err) { 
					return callback(JSON.parse(contents));
				} else {
					console.error(err);
				}
			});
	},

	sendJSON: function(res, data) {
	  res.statusCode = 200;
	  res.setHeader('content-type', 'application/json');
	  res.end(data);
	},

	handleRequest: function(req, res) {
		var which = req.params[0];
		var ids = req.query.ids || false;
		var details = req.query.details ? JSON.parse(decodeURIComponent(req.query.details)) : { mobile: false };

		if (details.dateString) {
			Utils.recordUserDetails(details);
		}

		this.findModelFor(which, ids, details.mobile, function(model) {
			if (model && typeof model !== "string")	 {
				this.sendJSON(res, JSON.stringify(model));
			} else {
				this.sendJSON(res, JSON.stringify({ error: model }));
			}
		}.bind(this));
	}
};
