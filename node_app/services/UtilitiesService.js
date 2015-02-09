// Utilities Service for Louisnk.com

var filterFor = function(dir, what) {
	return dir.filter(function(file, i) {
		return file.indexOf(what) !== -1;
	});

};

var combineJsonAndImages = function(base, imgs, jsonString) {

	if (jsonString) {
		jsonString = JSON.parse(jsonString);
	}

	if (jsonString && jsonString.sections) {

		for (var i = jsonString.sections.length - 1; i >= 0; i--) {
			var section = jsonString.sections[i];
			var images = filterFor(imgs, section.imgTag);

			section.images = [];
			if (images && images.length > 0) {
				for (var j = 0; j < images.length; j++) {
					section.images.push(makeImageObjects(base, images[j]));
				}				
			}
		};
	} else {
		console.error("There's an error in this json file: \n" + jsonString)
	}

	return jsonString;
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
		console.log(details);
	} else {
		console.log(details);
	}
};

var UtilitiesService = module.exports = {
	combineJson: 								combineJsonAndImages,
	filterFor: 									filterFor,
	recordUserDetails: 					recordUserDetails
};
