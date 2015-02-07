LnkAPP.factory("UtilitiesService", ["$rootScope", "Constants", function($rootScope, Constants) {

  /**
   *  Like _'s findWhere - search the passed array for
   *  the given search params
   *
   *  @param   array     [Array] The array to be searched
   *  @param   search    [object || string] an object with the properties
   *                      or string to search for in the given array
   */

  var findWhere = function(array, search) {
    var index = false;
    var data = false;

    if (search && typeof search === "object") {
      if (Array.isArray(array)) {
          var keys = Object.keys(search);

          for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < keys.length; j++) {
              var key = keys[j];
              if (array[i][key] === search[key]) {
                data = array[i];
                index = i;
              }          
            }
          }

        return { index: index, data: data };
        
      } else if (!Array.isArray(array)) {
        var origSearch = search;
        search = search[Object.keys(search)[0]];

        if (array[search] === origSearch[search]) {
          return { index: search, data: array[search] };
        } else {
          return false;
        }
      } 
    }
    
    else if (typeof search === "string") {
      // TODO: handle silly string searches
    }

  };

  var getUserDetails = function() {
    return {
      w: window.innerWidth,
      h: window.innerHeight
      // What else do I want to get?
    };
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

  var setHeroes = function(which) {
    var origin = "http://123.456.78.255/images/hero";
    return origin + Constants.STATE[which];
  };

  var setListeners = function(event, callback) {
    $rootScope.$on(event, function(event, eventData) {
      callback(event, eventData);
    });
  };

  return {
    findWhere:          findWhere,
    getUserDetails:     getUserDetails,
  	parseConstants: 		parseConstants,
    setHeroes:          setHeroes,
    setListeners: 			setListeners
  };
}]);