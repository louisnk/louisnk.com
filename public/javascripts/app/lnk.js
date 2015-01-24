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

  REQUESTS: {
    CODE:                     "CODE",
    HOME:                     "HOME",
    PROJECT:                  "PROJECT"
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
	$scope.page.title = "CODE";
	$scope.page.heroImageUrl = "/images/hero/code.jpg";
	$scope.page.heroImageAlt = "Bridger mountains as seen from Belgrade, MT";

	$scope.projects = [];

	var dataHandler = function(data, other) {
		if (data && data.length && data.length > 0) {
			$scope.projects = data;
			console.log($scope.projects);
		} else {
			// get some generic json to show an error?
		}
	};

	var getData = function() {
		// Do other stuff, if needed?
		DataService.get(Constants.REQUESTS.CODE, dataHandler);
	};

	getData();
}]);
LnkAPP.controller("GodController", ["$rootScope", "$scope", "$state", "DataService", "UtilitiesService", "NavigationService", "AnimationService", "Constants",
	function ($rootScope, $scope, $state, DataService, UtilitiesService, NavigationService, AnimationService, Constants) {
	
	$scope.page = {};

	$scope.states = {
	  nav: true
	};

	$scope.TO_CONTENT = Constants.EVENT.ANIMATION.SCROLL_TO_CONTENT;

	$scope.broadcast = function(e, eventName, eventData) {
	  if (e && e.preventDefault) { e.preventDefault(); }
	  $rootScope.$broadcast(eventName, eventData);
	};

	NavigationService.init();
	AnimationService.init();

	LnkAPP.constant("ConstantsTest", DataService.getConstants());
}]);

LnkAPP.controller("HomeController", ["$scope", "$stateParams", "Constants",
  function($scope, $stateParams, Constants) {

    var NAV_EVENTS = $scope.navEvents = Constants.EVENT.NAVIGATION;
    var ANIM_EVENTS = Constants.EVENT.ANIMATION;


    $scope.page.title = "LOUIS KINLEY";
    $scope.page.heroImageUrl = "/images/hero/home.jpg";
    $scope.page.heroImageAlt = "Seattle skyline in black and white at night";
    

    $scope.links = [
      { 
        title: Constants.STATE.CODE,
        alt: "Louis' CODE, as presented by him.",
        className: Constants.CLASS.CODE,
        FRAME_CLICK: NAV_EVENTS.CLICK_CODE 
      },
      { 
        title: Constants.STATE.ART,
        alt: "Louis' ART, as presented by him.",
        className: Constants.CLASS.ART,
        FRAME_CLICK: NAV_EVENTS.CLICK_ART 
      },
      { 
        title: Constants.STATE.LIFE,
        alt: "Louis' LIFE, as presented by him.",
        className: Constants.CLASS.LIFE,
        FRAME_CLICK: NAV_EVENTS.CLICK_LIFE
      }
    ];

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

	var REQUESTS = Constants.REQUESTS;
	var STATES = Constants.STATE;

	var makeRequestString = function(req, params) {
		var url = "./DataService";
		switch (req) {
			case REQUESTS.PROJECT:
				url += "/projects?id=" + 
						params.ids && params.ids.length > 0 ? 
						params.ids.join(",") : "all";
				break; 

			case REQUESTS.CODE:
				url += "/code";
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
			case STATES.CODE:
				req = makeRequestString(REQUESTS.CODE);
				break;
			default:
				req = makeRequestString(REQUESTS.HOME);
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

  return {
    setListeners: setListeners
  };
}]);