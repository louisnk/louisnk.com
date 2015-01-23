var APP = angular.module("APP", [ "ui.router" ]);

APP.config(["$stateProvider", "$urlRouterProvider", "Constants",
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

APP.constant("Constants", {
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



APP.controller("HomeController", ["$rootScope", "$scope", "$stateParams", "Constants", "NavigationService", "AnimationService",
  function($rootScope, $scope, $stateParams, Constants, NavigationService, AnimationService) {

    var NAV_EVENTS = $scope.navEvents = Constants.EVENT.NAVIGATION;
    var ANIM_EVENTS = Constants.EVENT.ANIMATION;

    $scope.states = {
      nav: true
    };

    $scope.pageTitle = "LOUIS KINLEY";
    $scope.heroImageUrl = "/images/hero/seattle_bw.jpg";
    $scope.heroImageAlt = "Seattle skyline in black and white at night";
    $scope.TO_CONTENT = Constants.EVENT.ANIMATION.SCROLL_TO_CONTENT;

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

    $scope.broadcast = function(e, eventName, eventData) {
      if (e && e.preventDefault) { e.preventDefault(); }
      $rootScope.$broadcast(eventName, eventData);
    };

    NavigationService.init();
    AnimationService.init();

}]);


APP.directive("heroImage", function factory($state) {
	var heroImageObject = {
		priority: 0,
		template: "/views/partials/heroes.html",
		restrict: "A",
		scope: false,
		compile: function compile(tElement, tAttrs) {
			tElement.addClass($state.current.name);
		}
	};

	return heroImageObject;
});
APP.factory("AnimationService", ["$rootScope", "$state", "Constants", "UtilitiesService",
  function($rootScope, $state, Constants, UtilitiesService) {

  var ANIM_EVENTS = Constants.EVENT.ANIMATION;

  var getContent = function() {
    return document.getElementsByClassName("content")[0];
  };

  var scrollToContent = function() {
    var content = getContent();
    
    window.scrollTo(0, content.offsetTop);
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

  var init = function() {
    watchWindow();

    for (var EVENT in Constants.EVENT.ANIMATION) {
      UtilitiesService.setListeners(EVENT, handleAnimations);
    }
  };

  return {
    init: init
  };
}]);

APP.factory("NavigationService", 
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

APP.factory("UtilitiesService", ["$rootScope", "Constants", function($rootScope, Constants) {

  var setListeners = function(event, callback) {
    $rootScope.$on(event, function(event, eventData) {
      callback(event, eventData);
    });
  };

  return {
    setListeners: setListeners
  };
}]);