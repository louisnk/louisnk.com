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
  NINJA:                      "ninja",
  CLASS: {
    CODE:                     "code",
    ART:                      "art",
    LIFE:                     "life"
  },

  EVENT: {
    ANIMATION: {
      EXPLORE:                "EXPLORE",
      SCROLL_TO_CONTENT:      "SCROLL_TO_CONTENT"
    },
    NAVIGATION: {
      CLICK_CODE:             "CLICK_CODE",
      CLICK_ART:              "CLICK_ART",
      CLICK_LIFE:             "CLICK_LIFE",
      SHOW_MENU:              "SHOW_MENU"
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


LnkAPP.controller("CodeController", ["$scope", "$stateParams", "$timeout", "DataService", "GraphService", "Constants",
	function($scope, $stateParams, $timeout, DataService, GraphService, Constants) {

	var dataHandler = function(data, other) {
		if (data && data.title) {
			$scope.page = data;
		} else {
			// get some generic json to show an error?
		}
	};

	var init = function() {
		$scope.getData(Constants.STATE.CODE, dataHandler);
	};

	init();
}]);

LnkAPP.controller("GodController", ["$rootScope", "$scope", "$state", "UtilitiesService", "DataService", "Constants", 
	function ($rootScope, $scope, $state, UtilitiesService, DataService, Constants) {
	var EVENT = Constants.EVENT;

	$scope.page = {};

	$scope.menu = [
		{
			EVENT: EVENT.NAVIGATION.CLICK_CODE,
			name: Constants.STATE.CODE
		},{
			EVENT: EVENT.NAVIGATION.CLICK_ART,
			name: Constants.STATE.ART
		},{
			EVENT: EVENT.NAVIGATION.CLICK_LIFE,
			name: Constants.STATE.LIFE
		}
	];

	$scope.states = {
	  nav: false,
	  mobile: UtilitiesService.isMobile()
	};

	$scope.NAV_EVENT = EVENT.NAVIGATION;
	$scope.TO_CONTENT = EVENT.ANIMATION.SCROLL_TO_CONTENT;
	$scope.STATE = Constants.STATE;
	$scope.ANIM_EVENT = EVENT.NANIMATION;

	$scope.broadcast = function(e, eventName, eventData) {
	  if (e && e.isDefaultPrevented) { e.preventDefault(); }
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
      $scope.page = data;
    } else {  
      // get some generic json to show an error?
    }
  };

  $scope.getData(Constants.STATE.HOME, dataHandler);

}]);


LnkAPP.directive("donutGraph", ["GraphService", "$state", "$timeout", function(GraphService, $state, $timeout) {
	var graphDirectiveObject = {
		restrict: "A",
		priority: 0,
		scope: "=",
		link: function(scope, tElement, tAttrs) {
			$timeout(function() {
				GraphService.makeDonutGraphFor(scope.page.skills[tAttrs.index], tElement[0]); 
			}, 200);
		}
	};

	return graphDirectiveObject;
}]);

LnkAPP.directive("heroImage", function factory($state) {
	var heroImageObject = {
		restrict: "A",
		priority: 0,
		templateUrl: "/views/partials/heroes.html",
		// controller: "HeroController",
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
  var scrolledAlready = false;
  var mobile = UtilitiesService.isMobile();

  var getContent = function() {
    return document.getElementsByClassName("content")[0];
  };

  var scrollToContent = function(content) {
    var previousY = 0;
    if (mobile) {
      window.scrollTo(0, content.offsetTop);
      return true;
    } else {
      var scroll = setInterval(function() {
        if (content.offsetTop > window.scrollY + 10 && 
            window.scrollY + 390 < window.innerHeight) { 
          previousY = window.scrollY;
          window.scrollTo(0, window.scrollY + 5);
          if (window.scrollY === previousY) {
            clearInterval(scroll);
          }
        } else {
          clearInterval(scroll);
        }
      },2);
      return true;
    }
  };

  var scrollToTop = function() {
    if (!mobile) {
  	  window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 100);
    }
    return true;
  };

  // deals with animation request events
  var handleAnimations = function(event, eventData) {

    switch (event.name) {
      case ANIM_EVENTS.SCROLL_TO_CONTENT:
        scrollToContent(getContent());
        break;

      default:
        break;
    }
  };

  // watch the window for scroll down, and go to content if we're not already
  var setAutoScrollToContent = function() {
    var previousY = 0;
    var currentState = $state.current.name;
    var content = getContent();

    window.addEventListener("scroll", function(e) {
      var y = window.scrollY;
      if (y > previousY && (y > 0 && previousY >= 0)) {

        if ($state.current.name === currentState && !scrolledAlready) {
          if (content.offsetTop > y) {
            scrollToContent(content);            
          }
        } else if (!scrolledAlready) {
          currentState = $state.current.name;
          content = getContent();
          if (content.offsetTop > y) {
            scrollToContent(content);
          }
        }
        scrolledAlready = true;
      }
      previousY = y;
    });
  };

  var watchState = function() {
  	$rootScope.$on("$stateChangeStart", function(a, b, c) {
      scrolledAlready = false;
  		scrollToTop();
  	});
  };

  // Set event listeners for every animation event
  var setAllListeners = function() {
    for (var EVENT in Constants.EVENT.ANIMATION) {
      UtilitiesService.setListeners(EVENT, handleAnimations);
    }
  };

  var init = function() {
    if (window.innerWidth > 993) { setAutoScrollToContent(); }
    watchState();
    setAllListeners();
  };

  return {
    init: init
  };
}]);

LnkAPP.factory("DataService", ["$http", "$cacheFactory", "UtilitiesService", "Constants", 
	function($http, $cacheFactory, UtilitiesService, Constants) {

	var STATE = Constants.STATE;
	var Cache = $cacheFactory("LnkCache");

	var get = function(what, params, callback) {
		if (typeof params === "function") {
			callback = params;
			params = {};
		}

		var requestUrl = "./DataService";

		params.details = UtilitiesService.getUserDetails();

		switch (what) {
			case STATE.CODE:
				requestUrl += "/code";
				break;
			default:
				requestUrl += "/home";
				break;
		}

		var existingData = Cache.get(what);

		if (!existingData) {
			$http.get(requestUrl, { params: params, cache: Cache })
				 .success(function(data, status, headers, config) {
				 	Cache.put(what, data);
				 	callback(data);
				 })
				 .error(function(data, status, headers, config) {
				 		new Error(data, status);
				 });
		} else {
			return callback(existingData);
		}
	};

	var post = function(what, data) {
		// TODO: Do I need to post anything?
		console.log(what, data);
	};

	return {
		get: get,
		post: post
	};

}]);
LnkAPP.factory("GraphService", ["Constants", function(Constants) {

	var scale = d3.scale.linear().domain([0,100]).range([0, Math.PI * 2]),

	init = function() {
		setListeners();
	},

	setListeners = function() {

	},

	/**
	 *	Creates an array with all 3 params needed for d3 donut graphs
	 *
	 *	@param  params 				[object] 
	 */
	paramsArray = function(params) {
		params = params && params.level ? params : { start: 0, level: 100, color: "#000" };

		return [[ -50,																	// start of the arc
		 				 parsePercentage(params.level) -50, 		// end of the arc
						 params.color || "#0c0"									// color of the arc fill
					 ]];
	},

	/**
	 *	Provides black "filler" data to make donuts 360°
	 */
	fillSection = function(params) {
		return [ parsePercentage(params[0][1]), 50, "#000" ];
	},

	/**
	 *	Takes the "level" property from a skill object and makes sense of it. Returns a number.
	 */
	parsePercentage = function(percentage) {
		if (typeof percentage === "number") {
			return Number(percentage);
		} else if (typeof percentage === "string") {
			return percentage.toLowerCase() === Constants.NINJA.toLowerCase() ? 100 : 50;
		} else {
			return 0;
		}
	},

	/**
	 * Does the heavy lifting to actually draw the donut graph.
	 *
	 *	@param  datas					[object || bool] if an object, parses relevant info for d3;
	 *																				 if a bool, creates generic half & half donuts
	 *
	 *	@param 	section 			[string] the selector for d3 to draw the arcs in
	 */
	makeDonutGraphFor = function(datas, section) {
		datas = new paramsArray(datas); 
		datas.push(fillSection(datas));
		// var $section = $( section + " .graph-box");

		var w = $(section).width(), h = $(section).height();
		var graph = d3.select(section);
		var arc = d3.svg.arc().innerRadius(50).outerRadius(100)
													.startAngle(function(d) { return scale(d[0]); })
													.endAngle(function(d) { return scale(d[1]); });

		graph.selectAll("path").data(datas).enter().append("path").attr("d", arc)
													 .style("fill", function(d) { return d[2]; })
													 .attr("transform", "translate(" + w/2 + "," + h/2 + ")");
	};

	return {
		init: 							init,
		makeDonutGraphFor: 	makeDonutGraphFor
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