var Utils = require("../node_app/services/UtilitiesService");
var dataService = require("../node_app/services/DataService");

fs = require("fs");
path = require("path");
logFile = "mockLog.log";
Promise = require("promise");
constants = require("../node_app/constants")
_ = require("lodash");


// Easier to have all of them defined in one place
var publicPath = path.join(process.cwd(), "public"),
		imagesDir = path.join(publicPath, "images"),
		imageName = "some_image.png",
		home = constants.STATE.HOME,
		details = { test: true },
		mockDir = ["abc", "def.ghi", "jkl.mno", "home.jpg", "code.jpg", "other.jpg", "def.jpg"],
		mockPage = {
			sections: [ { imgTag: "def" } ],
		},
		homeImages = path.join(imagesDir, home),

		readLogFile = function() {
			return new Promise(function(win,lose) {
				fs.readFile(logFile, "utf8", function(err, data) {
					if (!err) { win(data); }
					else lose(err);
				});
			})
		};



describe("Utilities service", function() {

	it("Records user details", function() {
		var originalLength = 0;

		readLogFile().then(function(data) {
			is(!!data, true);
			originalLength = data.length;
			is(Utils.recordUserDetails(details), true);
		}, function(err) {
			console.log(err);
		});

		readLogFile().then(function(newData) {
			is(newData.length > originalLength, true);
		}, function(err) {
			console.log(err);
		});
	});

	it("Sets hero images", function() {
		var mockObj = { heroImageUrl: "" };

		var heroedJson = Utils.setHeroes(mockObj, home);
		is(Object.keys(heroedJson).length == 1, true);
		is(heroedJson.heroImageUrl.length > 0, true);
		is(heroedJson.heroImageUrl.slice(-4) === ".jpg", true);
	});

	it("Filters directory for a given file", function() {
		is(Array.isArray(Utils.filterFor(mockDir, "def.ghi")), true);
	});

	it("Makes image objects with good url", function() {
		var imgObject = Utils.makeImageObjects(imagesDir,imageName);

		is(typeof imgObject, "object");
		is(imgObject.url && typeof imgObject.url === "string", true);
		is(imgObject.url.slice(-4) === ".png", true);
	});

	it("Joins image objects with a page's data model", function() {
		var combinedJson = Utils.combineJsonAndImages(imagesDir, mockDir, mockPage);

		is(typeof combinedJson, "object");
		is(combinedJson.sections.length, 1);
		is(combinedJson.sections[0].images[0].alt, "def");
	});

	it("Combines all the things into a beautiful package", function() {
		// TODO: test to make sure that the product of previously tested functions is as expected (how could it not be?)
		// test Utils.combineJson(......);
		var masterModel = Utils.combineJson(imagesDir, mockDir, mockPage, home);
	});
});



describe("Data things", function() {

	it("reads a directory for a page's model, returns a promise", function() {
		dataService.getJson(home).then(function(json) {
			is(typeof json, "object");
			is(json.mobile && Object.keys(json.mobile).length > 1, true);
			is(json.desktop && Object.keys(json.desktop).length > 1, true);
		}, function(err) {
			console.log(err);
			is(false, true);
		});
	});

	it("reads a directory, returns a promised array", function() {
		dataService.readDirectory(homeImages).then(function(images) {
			is(Array.isArray(images), true);
			is(images.length > 0, true);
		}, function(err) {
			console.log(err);
			is(false, true);
		});
	});

	it("Manages the retrieval and construction of appropriate data model", function() {
		console.log("manage some things?");
		dataService.buildModelFor(home, [], true).then(function(model) {
			console.log(model);
			is(model && typeof model === "object", true);
		}).catch(function(err) {
			console.log("who dunnit?", err);
		});
	});


});	
