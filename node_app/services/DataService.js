var Utils = require("./UtilitiesService");
var path = require("path");
var constants = require("../constants");
var STATE = constants.STATE;

// // TODO: break this out into a config file
var baseDir = path.join(__dirname, "..", "..", "public");

module.exports = {
	findModelFor: function(which, ids, mobile) {
		mobile = mobile || false;

		var self = this,
				getJson = this.getJson.bind(this, baseDir),
				imgsDir = "";

		switch (which) {

			case STATE.ART.toLowerCase():
			case STATE.CODE.toLowerCase():
			case STATE.HOME.toLowerCase():
			case STATE.LIFE.toLowerCase():
			case STATE.PROJECTS.toLowerCase():
				imgsDir = path.join(baseDir, "images", which);
				break;

			default:
				imgsDir = path.join(baseDir, "images");
				break;
		}
		console.log(which, imgsDir);
		return new Promise(function(success, fail) {
			if (imgsDir) {
				return self.getJson(which).then(self.readDirectory(imgsDir)).then(function(json) {
					json = mobile ? json.mobile : json.desktop;
					return success(Utils.combineJson(imgsDir, json, which));
				});
			} else {
				return fail("No files found");
			}
		});
	},

	readDirectory: function(imgsDir) {
		return new Promise(function(success, fail) {
			fs.readdir(imgsDir, function(err, imgs) {
				if(!err) { return success(imgs); }
				else { return fail(err, imgsDir, imgs); }
			});
			
		});
	},	

	getJson: function(page, callback) {
		return new Promise(function(success, fail) {
			fs.readFile(path.join(baseDir, "json", page + ".json"), {encoding: "utf8"},  function(err, contents) {
					if (!err) { 
						return success(JSON.parse(contents));
					} else {
						return fail(err);
					}
				});
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

		try {
			this.findModelFor(which, ids, details.mobile).then(function(model) {
				console.log(model);
				this.sendJSON(res, JSON.stringify(model));
			}.bind(this));
		} catch (e) {
			console.error(e);
		}
	}

};
