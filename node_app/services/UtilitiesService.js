// Utilities Service for Louisnk.com
var Promise = require("promise");

/**
 *	Like _'s, but probably not as fast.
 */
var filterFor = function(dir, what) {
	return dir.filter(function(file, i) {
		return file.indexOf(what) !== -1;
	});

};

/**
 *	Parent function for setting images dynamically in a page's data model
 */
var combineJson = function(base, imgs, json, which) {
	var combinedJson = combineJsonAndImages(base, imgs, json);
	combinedJson = setHeroes(combinedJson, which);
	return combinedJson;
};

/**
 *	Returns json with image "objects" in place for a given page
 *
 *	@param 	base				[string] path to the containing directory
 *	@param	imgs 				[array] array of image filenames
 *	@param	json 				[Object] the data model for the page
 */
var combineJsonAndImages = function(base, imgs, json) {

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
		};
	} else {
		// TODO: Improve error logging
	}

	return json;
};


/**
 *	Returns "image" objects with properties url and alt
 *
 *	@param	base				[string] path to the containing directory
 *	@param	image 			[string] name of the image file
 */
var makeImageObjects = function(base, image) {
	
	if (base && image) {
		return { url: 
			path.join(base, image).split("public")[1], 
			alt: image.split(".")[0] 
		};
	} else {
		return false;
	}
};

/**
 *	Opens or creates a log file, then writes details to it
 *	
 *	@param 	details 				[object] details object to be written to log
 */

var writeLogFile = function(details) {
	console.log(global.logFile, details);
	return new Promise(function(resolve, reject) { 
		fs.write(global.logFile, JSON.stringify(details), 0, "utf8", function(err, written, string) { 
			if (err) { reject(err); }
			else { resolve(string); }
		});
	});
};

/**
 *	Mostly for dev purposes at this point, but also useful for 
 *	setting up some custom analytics if I want
 */
var recordUserDetails = function(details) {

	if (typeof details === "object" && 
			Object.keys(details) && 
			Object.keys(details).length) {
		// TODO: set up DB connection to log these things - or use GA
		details.dateString = (new Date()).toTimeString();
		var logged = writeLogFile(details)
			.done(function(datas) {
				console.log(typeof datas);
			});
		// console.log(logged);

	} else {
		console.log(details);
	}
};

/**
 *	Sets "hero" images dynamically, based on user detail flags
 * 	modifies and returns the original json structure
 *
 *	@param json 				[object] the data model for a page
 */
var setHeroes = function(json, state) {

	var STATE = global.constants.STATE,
			mobile = global.details.mobile ? "_mobile" : "",
  		origin, which,
  		json = json || {};

  origin = global.details.dev ?  
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
};

var UtilitiesService = module.exports = {
	combineJson: 								combineJson,
	filterFor: 									filterFor,
	recordUserDetails: 					recordUserDetails
};
