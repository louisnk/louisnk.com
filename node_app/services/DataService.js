var Utils = require("./UtilitiesService");
var STATE = global.constants.STATE;

module.exports = {
	findModelFor: function(which, ids, mobile) {
		mobile = mobile || false;

		var readDirectory = function(dir) {
			return new Promise(function(success, fail) {

				fs.readdir(dir, function(err, imgs) {
					if(!err) { return success(imgs); }
					else { return fail(err, dir, imgs); }
				});

			});
		},	

		getJson = function(baseDir, page, callback) {

			fs.readFile(path.join(baseDir, "json", page + ".json"), {encoding: "utf8"}, 
				function(err, contents) {
					if (!err) { 
						return callback(JSON.parse(contents));
					} else {
						console.error(err);
					}
				});
		},

		// TODO: break this out into a config file
		baseDir = path.join(__dirname, "..", "..", "public"),
		getJson = getJson.bind(this, baseDir),
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

		return new Promise(function(success, fail) {
			if (dir) {
				readDirectory(dir).then(getJson(which, function(json) {
					json = mobile ? json.mobile : json.desktop;
					return success(Utils.combineJson(dir, json, which));
				})).fail(function(err) {
					return fail(err);
				});
			} else {
				return fail("No files found");
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

		this.findModelFor(which, ids, details.mobile).then(function(model) {
			this.sendJSON(res, JSON.stringify(model));
		}).fail(function(model) {
			this.sendJSON(res, JSON.stringify({ error: model }));
			
		});
	}

};
