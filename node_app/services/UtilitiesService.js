var path = require("path");
// Utilities Service for Louisnk.com

var UtilitiesService = module.exports = {
	/**
	 *	A wrapper on _'s filter function.
	 */
	filterFor: function(dir, what) {
		return _.filter(dir, function(file, i) {
			return file.indexOf(what) !== -1;
		});
		
	},

	/**
	 *	Parent function for setting images dynamically in a page's data model
	 */
	combineJson: function(baseDir, imgs, json, which) {
		return this.setHeroes(this.combineJsonAndImages(baseDir, imgs, json), which);
	},

	/**
	 *	Returns json with image "objects" in place for a given page
	 *
	 *	@param 	base				[string] path to the containing directory
	 *	@param	imgs 				[array] array of image filenames
	 *	@param	json 				[Object] the data model for the page
	 */
	combineJsonAndImages: function(base, imgs, json) {

		if (json && json.sections) {
			for (var i = json.sections.length - 1; i >= 0; i--) {
				var section = json.sections[i] || json.skills[i];
				var images = this.filterFor(imgs, section.imgTag);

				section.images = [];
				if (images && images.length > 0) {
					for (var j = 0; j < images.length; j++) {
						section.images.push(this.makeImageObjects(base, images[j]));
					}				
				}
			}
		} else {
			console.error("failed to receive json for " + base, imgs, "\n", json);
			// console.log("failed to combine ", base);
		}
		return json;
	},

	/**
	 *	Returns "image" objects with properties url and alt
	 *
	 *	@param	base				[string] path to the containing directory
	 *	@param	image 			[string] name of the image file
	 */
	makeImageObjects: function(base, image) {
		if (base && image) {
			return { url: 
				path.join(base, image).split("public")[1],
				alt: image.split(".")[0]
			};
		} else {
			return false;
		}
	},

	/**
	 *	Opens or creates a log file, then writes details to it
	 *	
	 *	@param 	details 				[object] details object to be written to log
	 */
	updateLogFile: function(details) {
		return new Promise(function(resolve, reject) { 
			var d = fs.readFileSync(logFile, "utf8");

			if (d.length > 0) {
				fs.appendFile(logFile, "\n" + JSON.stringify(details), {encoding: "utf8"}, function(err, done) { 
					if (err) { reject(err); }
					else { resolve(done); }
				});
			} else {
				fs.writeFile(logFile, JSON.stringify(details), {encoding: "utf8"}, function(err, done) {
					if (err) { reject(err); }
					else { resolve(done); }
				});
			}
		});
	},

	/**
	 *	Mostly for dev purposes at this point, but also useful for 
	 *	setting up some custom analytics if I want
	 */
	recordUserDetails: function(details) {

		if (typeof details === "object" && 
				Object.keys(details) && 
				Object.keys(details).length) {
			// TODO: set up DB connection to log these things - or use GA?
			details.dateString = (new Date()).toString();
			
			var logged = this.updateLogFile(details)
				.then(function(datas) {
					return "saved";
				}, function(err) {
					console.log(err);
				});
		} else {
			console.log(details);
		}
		return true;
	},

	/**
	 *	Sets "hero" images dynamically, based on user detail flags
	 * 	modifies and returns the original json structure
	 *
	 *	@param json 				[object] the data model for a page
	 *	@param state 				[string | Constant] the constant representing the requested state
	 */
	setHeroes: function(json, state) {

		var STATE = constants.STATE,
				mobile = false ? "_mobile" : "", // TODO: set this correctly - cookies?
	  		origin, which,
	  		json = json || {};

	  origin = true ?  // TODO: get this set right!!!!!!
	           "../images/hero/" : 
	           "https://s3-us-west-2.amazonaws.com/louisnk/";

	  switch (state.toLowerCase()) {
	    case STATE.HOME.toLowerCase():
	      which = STATE.HOME;
	      break;
	    case STATE.CODE.toLowerCase():
	      which = STATE.CODE;
	      break;
	    case STATE.LIFE.toLowerCase():
	    	which = STATE.LIFE;
	    	break;
	    default:
	      which = STATE.HOME;
	      break;
	  }

	  json.heroImageUrl = origin + which.toLowerCase() + mobile + ".jpg";
	  return json;
	}
};
