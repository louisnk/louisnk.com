LnkAPP.factory("UtilitiesService", ["$rootScope", "Constants", function($rootScope, Constants) {

  var STATE = Constants.STATE;
  var dev = window.location.origin.match("50.0.0") || 
            window.location.origin.match("localhost") ? true : false;

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

  /**
   *  Get things that aren't easy to get from the server
   *  returns an [object]
   */
  var getUserDetails = function() {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
      dev: dev,
      mobile: isMobile()
      // What else do I want to get?
    };
  };

  /**
   *  Returns boolean true or false
   */
  var isMobile = function() {
    if( navigator.userAgent.match(/Android/i)       ||
        navigator.userAgent.match(/webOS/i)         ||
        navigator.userAgent.match(/iPhone/i)        ||
        navigator.userAgent.match(/iPad/i)          ||
        navigator.userAgent.match(/iPod/i)          ||
        navigator.userAgent.match(/BlackBerry/i)    ||
        navigator.userAgent.match(/Windows Phone/i) ||
        window.innerWidth < 993) {
      return true;
    } else {
      return false;
    }
  };

  /**
   *  May not be needed anymore, with addition of constants on the server
   *  which should be browserified for simplicity
   */
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

  var setListeners = function(event, callback) {
    $rootScope.$on(event, function(event, eventData) {
      callback(event, eventData);
    });
  };

  return {
    findWhere:          findWhere,
    getUserDetails:     getUserDetails,
    isMobile:           isMobile,
  	parseConstants: 		parseConstants,
    setListeners: 			setListeners
  };
}]);
