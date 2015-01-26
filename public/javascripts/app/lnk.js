var LnkAPP = angular.module("LnkAPP", [ "ui.router" ]);

LnkAPP.config(["$stateProvider", "$urlRouterProvider", "Constants",
  function($stateProvider, $urlRouterProvider, Constants) {
  $urlRouterProvider.otherwise("/");
  
  var STATE = Constants.STATE;

  $stateProvider
    .state(STATE.HOME, {
      url: "/",
      templateUrl: "views/partials/home.html"
    })
    .state(STATE.CODE, {
      url: "/code",
      templateUrl: "views/partials/code.html"
    })
    .state(STATE.PROJECT, {
      url: "/code/:projectId",
      templateUrl: "views/partials/project.html"
    })
    .state(STATE.ART, {
      url: "/art",
      templateUrl: "views/partials/art.html"
    })
    .state(STATE.GALLERY, {
      url: "/art/:galleryId",
      templateUrl: "views/partials/gallery.html"
    })
    .state(STATE.LIFE, {
      url: "/life",
      templateUrl: "views/partials/life.html"
    })
    .state(STATE.RESUME, {
      url: "/life/resume",
      templateUrl: "views/partials/resume.html"
    });
}]).run(["NavigationService", "AnimationService", "DataService", 
  function(NavigationService, AnimationService, DataService) {

    NavigationService.init();
    AnimationService.init();
    
}]);

LnkAPP.constant("Constants", {
  CLASS: {
    CODE:                     "code",
    ART:                      "art",
    LIFE:                     "life"
  },

  EVENT: {
    NAVIGATION: {
      CLICK_CODE:             "CLICK_CODE",
      CLICK_ART:              "CLICK_ART",
      CLICK_LIFE:             "CLICK_LIFE"
    },
    ANIMATION: {
      SCROLL_TO_CONTENT:      "SCROLL_TO_CONTENT" 
    }
  },
  
  STATE: {
    HOME:                     "HOME",
    CODE:                     "CODE",
    ART:                      "ART",
    GALLERY:                  "GALLERY",
    PROJECT:                  "PROJECT",
    LIFE:                     "LIFE",
    RESUME:                   "RESUME"
  }
});


LnkAPP.controller("CodeController", ["$scope", "$stateParams", "DataService", "Constants",
	function($scope, $stateParams, DataService, Constants) {

	var dataHandler = function(data, other) {
		if (data && data.title) {
			$scope.page = data;
		} else {
			// get some generic json to show an error?
		}
	};

	$scope.getData(Constants.STATE.CODE, dataHandler);
}]);
LnkAPP.controller("GodController", ["$rootScope", "$scope", "$state", "DataService", "UtilitiesService", "NavigationService", "AnimationService", "Constants", 
	function ($rootScope, $scope, $state, DataService, UtilitiesService, NavigationService, AnimationService, Constants) {
	
	$scope.page = {};

	$scope.states = {
	  nav: true
	};

	$scope.navEvents = Constants.EVENT.NAVIGATION;
	$scope.TO_CONTENT = Constants.EVENT.ANIMATION.SCROLL_TO_CONTENT;

	$scope.broadcast = function(e, eventName, eventData) {
	  if (e && e.preventDefault) { e.preventDefault(); }
	  $rootScope.$broadcast(eventName, eventData);
	};



	$scope.getData = function(fromWhere, callback) {
		DataService.get(fromWhere, callback);
		// Do other stuff, if needed?
	};


}]);

LnkAPP.controller("HomeController", ["$scope", "$stateParams", "UtilitiesService", "Constants",
  function($scope, $stateParams, UtilitiesService, Constants) {

  var dataHandler = function(data, other) {
    if (data && data.title) {
      if (data.sections.length > 0) {
        for (var i = 0; i < data.sections.length; i++) {
          data.sections[i] = UtilitiesService.parseConstants(data.sections[i]);
        }
        $scope.page = data;
      }
    } else {
      // get some generic json to show an error?
    }
  };

  $scope.getData(Constants.STATE.HOME, dataHandler);

}]);


LnkAPP.directive("heroImage", function factory($state) {
	var heroImageObject = {
		priority: 0,
		templateUrl: "/views/partials/heroes.html",
		restrict: "A",
		scope: false,
		compile: function compile(tElement, tAttrs) {
			tElement.addClass($state.current.name);
		}
	};

	return heroImageObject;
});
LnkAPP.factory("AnimationService", ["$rootScope", "$state", "Constants", "UtilitiesService",
  function($rootScope, $state, Constants, UtilitiesService) {

  var ANIM_EVENTS = Constants.EVENT.ANIMATION;

  var getContent = function() {
    return document.getElementsByClassName("content")[0];
  };

  var scrollToContent = function() {
    var content = getContent();
    
    window.scrollTo(0, content.offsetTop);
  };

  var scrollToTop = function() {
  	window.scrollTo(0, 0);
  };

  // deals with animation request events
  var handleAnimations = function(event, eventData) {

    switch (event.name) {
      case ANIM_EVENTS.SCROLL_TO_CONTENT:
        scrollToContent();
        break;

      default:
        break;
    }

  };

  // watch the window for scroll down, and go to content if we're not already
  var watchWindow = function() {
    var previousY = 0;
    var currentState = $state.current.name;
    var content = getContent();

    window.addEventListener("scroll", function(e) {
      var y = window.scrollY;
      if (y > previousY) {

        if ($state.current.name === currentState) {
          if (content.offsetTop > y) {
            scrollToContent();            
          }
        } else {
          currentState = $state.current.name;
          content = getContent();
          if (content.offsetTop > y) {
            scrollToContent();
          }
        }
      }

      previousY = y;
    });
  };

  var watchState = function() {
  	$rootScope.$on("$stateChangeStart", function(a, b, c) {

  		scrollToTop();
  	});
  };

  var init = function() {
    watchWindow();
    watchState();

    for (var EVENT in Constants.EVENT.ANIMATION) {
      UtilitiesService.setListeners(EVENT, handleAnimations);
    }
  };

  return {
    init: init
  };
}]);
LnkAPP.factory("CacheingService", [function() {

	var register = function(request, data) {
		// TODO: create cache-registry, fill this in
		console.log(request, data);
	};

	var remove = function(request) {
		// TODO: create cache-removal
	};

	var getFromRegistry = function(request, data) {
		// TODO: return data, or false
		return false;
	};

	return {
		getFromRegistry: getFromRegistry,
		register: 	register,
		remove: 	remove
	};
}]);
LnkAPP.factory("DataService", ["$http", "CacheingService", "Constants", 
	function($http, CacheingService, Constants) {

	var STATE = Constants.STATE;

	var makeRequestString = function(req, params) {
		var url = "./DataService";

		switch (req) {
			case STATE.PROJECT:
				url += "/projects?id=" + 
						params.ids && params.ids.length > 0 ? 
						params.ids.join(",") : "all";
				break; 

			case STATE.CODE:
				url += "/code";
				break;

			case STATE.ART:
				url += "/art";
				break;

			default:
				url += "/home";
				break;
		}

		return url;
	};

	// TODO: Make back-end for this to actually GET the data.

	var get = function(what, params, callback) {
		params = params || false;
		callback = typeof params === "function" ? params : callback;

		var req = "";

		switch (what) {
			case STATE.CODE:
				req = makeRequestString(STATE.CODE);
				break;
			default:
				req = makeRequestString(STATE.HOME);
				break;
		}

		var existingData = CacheingService.getFromRegistry(req);

		if (!existingData) {
			$http.get(makeRequestString(what, params))
				 .success(function(data, status, headers, config) {
				 	callback(data);
				 })
				 .error(function(data, status, headers, config) {
				 	console.log(data, status);
				 });
		} else {
			return callback(existingData);
		}
	};

	var post = function(what, data) {
		console.log(what, data);
	};

	return {
		get: get,
		post: post
	};

}]);
LnkAPP.factory("NavigationService", 
  ["$rootScope", "$state", "$stateParams", "Constants", "UtilitiesService",
  function($rootScope, $state, $stateParams, Constants, UtilitiesService) {

    var NAV_EVENTS = Constants.EVENT.NAVIGATION;
    var STATE = Constants.STATE;


    // self explanatory
    var handleStateTransition = function(event, eventData) {
      var currentState = $state.current.name;
      var targetState = STATE.HOME;
      var params = {};

      if (event.name === currentState) { 
        return false;
        // do nothing, stop cilcking the same thing 
      }

      switch (event.name) { 
        case NAV_EVENTS.CLICK_CODE:
          targetState = STATE.CODE;
          break;

        case NAV_EVENTS.CLICK_ART:
          targetState = STATE.ART;
          break;

        case NAV_EVENTS.CLICK_LIFE:
          targetState = STATE.LIFE;
          break;

        case NAV_EVENTS.CLICK_GALLERY:
          targetState = STATE.GALLERY;
          params.galleryId = eventData;
          break;

        case NAV_EVENTS.CLICK_PROJECT:
          targetState = STATE.PROJECT;
          params.projectId = eventData;
          break;

        default:
          targetState = STATE.HOME;
          break;
      }

      return goTo(targetState, params);
    };

    // Go to the given state, with any passed params
    var goTo = function(state, params) {
      if (!params) {
        $state.go(state);
      } else {
        $state.go(state, params);
      }
    };

    /** 
     *  Bind event listeners to everything in the set of Constants passed in
     *  @param EVENTS               [object/CONSTANTS]
     */
    var bindListeners = function(EVENTS) {
      for (var EVENT in EVENTS) {
        UtilitiesService.setListeners(EVENT, handleStateTransition);
      }
    };

    var init = function() {
      bindListeners(NAV_EVENTS);
    };

    return {
      init: init
    };
}]);

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