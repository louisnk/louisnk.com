var utils = require("../node_app/services/UtilitiesService");
fs = require("fs");
path = require("path");
logFile = "mockLog.log";
Promise = require("promise");
_ = require("lodash");

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
		is(utils.recordUserDetails(details), true);

		fs.readFile(logFile, "utf8", function(err, data) {
			if (!err) { is(JSON.parse(data).test, true); }
		});
	});

});
