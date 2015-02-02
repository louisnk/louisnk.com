LnkAPP.factory("UtilitiesService", ["$rootScope", "Constants", function($rootScope, Constants) {

  var findWhere = function(array, search) {
    if (typeof seacrh === "object") {
      var index = false;
      var data = false;

      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < Object.keys(search).length; j++) {
          var key = Object.keys(search)[j];
          if (array[i][key] === search[key]) {
            data = array[i];
            index = i;
          }          
        }
      }

      return { index: index, data: data };
    } else if (typeof search === "string") {
      // TODO: handle silly string searches
    }

  };


  var getUserDetails = function() {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
      ua: navigator.userAgent
    };
  };

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
    findWhere:          findWhere,
    getUserDetails:     getUserDetails,
  	parseConstants: 		parseConstants,
    setListeners: 			setListeners
  };
}]);