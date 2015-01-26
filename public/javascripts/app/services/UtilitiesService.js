LnkAPP.factory("UtilitiesService", ["$rootScope", "Constants", function($rootScope, Constants) {

  var setListeners = function(event, callback) {
    $rootScope.$on(event, function(event, eventData) {
      callback(event, eventData);
    });
  };

  var parseConstants = function(section) {
  	var keys = Object.keys(section);

  	for (var i  = 0; i < keys.length; i++) {
  		var key = keys[i];

  		if (typeof section[key] === "string" && 
  				section[key].indexOf("Constants.") !== -1) {
  			
				var parts = section[key].split(".");
				var CONSTANT = Constants;

				for (var j = 1; j < parts.length; j++) {
					var part = parts[j];
					CONSTANT = CONSTANT[part];
				}

				section[key] = CONSTANT;
  		}
  	}

  	return section;
  };

  return {
  	parseConstants: 		parseConstants,
    setListeners: 			setListeners
  };
}]);