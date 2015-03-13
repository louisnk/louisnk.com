var Utils = require("./UtilitiesService");
var path = require("path");
var constants = require("../constants");
var STATE = constants.STATE;

// // TODO: break this out into a config file
var baseDir = path.join(__dirname, "..", "..", "public");

module.exports = {

	/**
	 *	retrieves, builds, and returns a promised data model, for the requested page
	 *	
	 *	@param 	which 						[string | Constant]		The state whose model you want
	 * 	@param 	ids 							[array] 							Array of ids used to find a specific model
	 * 	@param 	mobile 						[bool]								Flag for which data model needs to be returned
	 */
	buildModelFor: function(which, ids, mobile) {
		var self = this,
				tmpModel = {};

		return new Promise(function(resolve, reject) {
			self.findModelFor(which, ids, mobile).then(function(model) {
				tmpModel = model;
				return self.readDirectory(self.imagesDirPath(which));
			}).then(function(images) {
				return resolve(Utils.combineJson(baseDir, images, tmpModel, which));
			}).catch(function(err) {
				return reject(new Error(err));
			});
		});
	},

	/**
	 *	Simply finds and returns the correct JSON model in a promise
	 *
	 *	@param 	which 						[string | Constant] 	The state whose model you want
	 * 	@param 	ids 							[array] 							Array of ids used to find a specific model
	 * 	@param 	mobile 						[bool]								Flag for which data model needs to be returned
	 */
	findModelFor: function(which, ids, mobile) {
		mobile = mobile || false;

		if (ids && ids) {
			// TODO: handle ID based searches
		}

		return new Promise(function(resolve, reject) {
			this.getJson(which).then(function(json) {
				json = mobile ? json.mobile : json.desktop;
				return resolve(json);
			}, function(err) {
				return reject(new Error(err));
			});
		});
	},

	/**
		*	Just a wrapper around fs.readdir. Returns a promise of the dir array without files that start with "."
		*
		* Filters out any file that starts with "." 
		*/
	readDirectory: function(dir) {
		return new Promise(function(resolve, reject) {
			fs.readdir(dir, function(err, files) {
					return err ? 
								 reject(new Error(err)) :
								 resolve(files.filter(function(file) {
									return !file.match(/^\..+/);
								})); 
			});
		});
	},

	/**
	 *	A simple switch (probably not the best choice) to build the right path, returns a string
	 */
	imagesDirPath: function(which) {
		switch (which) {
			case STATE.ART.toLowerCase():
			case STATE.CODE.toLowerCase():
			case STATE.HOME.toLowerCase():
			case STATE.LIFE.toLowerCase():
			case STATE.PROJECTS.toLowerCase():
				return path.join(baseDir, "images", which);
				break;

			default:
				return path.join(baseDir, "images");
				break;
		}
	},


	/**
	 *	Reads the json file for the requested page, and returns a promise with its contents
	 *	@param page 						[string]	the page/state to find the model for
	 */
	getJson: function(page) {
		if (page && typeof page === "string") {
			return new Promise(function(resolve, reject) {
				fs.readFile(path.join(baseDir, "json", page + ".json"), {encoding: "utf8"},  function(err, contents) {
					return err ? reject(new Error(err)) : resolve(JSON.parse(contents));
				});
			});
		} else {
			return new Promise.reject("Invalid parameter");
		}
	},

	/**
	 *	Sets status code, header, and sends JSON data
	 * 	@param res 							[stream] 	the HTTP response stream object for the Node server
	 * 	@param data 						[object] 	the JSON object you want to send
	 */
	sendJSON: function(res, data) {
	  res.statusCode = 200;
	  res.setHeader('content-type', 'application/json');
	  res.end(data);
	},

	/**
	 *	HTTP request handler for the live endpoints
	 * 	@param req 							[object]	the HTTP request object
	 *	@param res 							[stream] 	the HTTP response stream object
	 */
	handleRequest: function(req, res) {
		var which = req.params[0];
		var ids = req.query.ids || false;
		var details = req.query.details ? JSON.parse(decodeURIComponent(req.query.details)) : { mobile: false };

		if (details.dateString) {
			Utils.recordUserDetails(details);
		}

		this.buildModelFor(which, ids, details.mobile).then(function(model) {
			console.log("in the final countdown!!", model);
			this.sendJSON(res, JSON.stringify(model));
		}.bind(this), function(err) {
			console.log(err);
		});

	}

};
