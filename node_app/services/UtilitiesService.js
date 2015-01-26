// Utilities Service for Louisnk.com

var filterFor = function(dir, what) {
	return dir.filter(function(file, i) {
		return file.indexOf(what) !== -1;
	});
};



var combineJsonAndImages = function(imgs, jsonString) {

	if (jsonString) {
		jsonString = JSON.parse(jsonString);
	}

	if (jsonString && jsonString.sections && jsonString.sections.length ) {
		for (var i = jsonString.sections.length - 1; i >= 0; i--) {
			var section = jsonString.sections[i];
			section.images = filterFor(imgs, section.title);
		};

	} else {
		console.error("There's an error in this json file: " + json)
	}

	return jsonString;
};

var UtilitiesService = module.exports = {
	combineJson: 								combineJsonAndImages,
	filterFor: 									filterFor
};
