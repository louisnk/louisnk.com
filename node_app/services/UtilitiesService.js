// Utilities Service for Louisnk.com

var filterFor = function(dir, what) {
	return dir.filter(function(file, i) {
		return file.indexOf(what) !== -1;
	});

};

var combineJson = function(base, imgs, json) {
	var combinedJson = combineJsonAndImages(base, imgs, json);
	combinedJson = setHeroes(combinedJson);
	return combinedJson;
};

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
		// console.error("There's an error in this json file: \n" + json)
	}

	return json;
};

var makeImageObjects = function(base, image) {
	
	if (image) {
		return { url: 
			path.join(base, image).split("public")[1], 
			alt: image.split(".")[0] 
		};
	} else {
		return false;
	}
};

var recordUserDetails = function(details) {

	if (typeof details === "object" && 
			Object.keys(details) && 
			Object.keys(details).length) {
		// TODO: set up DB connection to log these things - or use GA
		global.details = details;

	} else {
		console.log(details);
	}
};

var setHeroes = function(json) {
	var STATE = global.constants.STATE;
	var mobile = global.details.mobile ? "_mobile" : "";
  var origin;
  var which;

  origin = global.details.dev ?  
           "../images/hero/" : 
           "https://s3-us-west-2.amazonaws.com/louisnk/";

  switch (json.title.toLowerCase()) {
    case "louis kinley":
      which = STATE.HOME;
      break;
    case "code":
      which = STATE.CODE;
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
