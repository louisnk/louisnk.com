// Utilities Service for Louisnk.com

var UtilitiesService = module.exports = {
	/**
	 *	Like _'s, but probably not as fast.
	 */
	filterFor: function(dir, what) {
		return _.filter(dir, function(file, i) {
			return file.indexOf(what) !== -1;
		});
	},

	/**
	 *	Parent function for setting images dynamically in a page's data model
	 */
	combineJson: function(base, imgs, json, which) {
		return setHeroes(combineJsonAndImages(base, imgs, json), which);
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
				var section = json.sections[i];
				var images = filterFor(imgs, section.imgTag);

				section.images = [];
				if (images && images.length > 0) {
					for (var j = 0; j < images.length; j++) {
						section.images.push(makeImageObjects(base, images[j]));
					}				
				}
			}
		} else {
			log.error("failed to receive json for " + base);
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

	writeLogFile: function(details) {
		return new Promise(function(resolve, reject) { 
			return new Promise(function(res, rej) {
				fs.readFile(logFile, "utf8", function(err, data) { 
					if (err) { rej(err); }
					else { res(data); }
				});
			}).then(function(file) {
				fs.writeFile(logFile, JSON.stringify(details), file.length, function(err, success) { 
					if (err) { reject(err); }
					else { resolve(success); }
				});
			});
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
			// TODO: set up DB connection to log these things - or use GA
			details.dateString = (new Date()).toString();
			var logged = this.writeLogFile(details)
				.done(function(datas) {
					return "saved";
				});
			console.log(logged);
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
