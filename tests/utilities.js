var utils = require("../node_app/services/UtilitiesService");
var dataService = require("../node_app/services/DataService");

fs = require("fs");
path = require("path");
logFile = "mockLog.log";
Promise = require("promise");
_ = require("lodash");

var readLogFile = function() {
	return new Promise(function(win,lose) {
		fs.readFile(logFile, "utf8", function(err, data) {
			if (!err) { win(data); }
			else lose(err);
		});
	})
};

describe("Does utilitarian things", function() {
	it("filters directory for given file", function() {
		var mockDir = ["abc", "def.ghi", "jkl.mno"];

		is(Array.isArray(utils.filterFor(mockDir, "def.ghi")), true);
	});

	it("makes image objects", function() {
		var base = "./public/images/";
		var image = "some_crazy_image.png";
		is(typeof utils.makeImageObjects(base,image), "object");
	});

	it("Records user details", function() {
		var details = { test: true };
		var originalLength = 0;

		readLogFile().then(function(data) {
			is(!!data, true);
			originalLength = data.length;
			is(utils.recordUserDetails(details), true);
		});

		readLogFile().then(function(newData) {
			is(newData.length > originalLength, true);
		});
	});

});


describe("Does data things", function() {
	it("is true", function() {
		is(true, true);
	});
});	
