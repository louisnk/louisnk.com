LnkAPP.factory("AnimationService", ["$rootScope", "$state", "Constants", "UtilitiesService",
  function($rootScope, $state, Constants, UtilitiesService) {

  var ANIM_EVENTS = Constants.EVENT.ANIMATION;
  var scrolledAlready = false;

  var getContent = function() {
    return document.getElementsByClassName("content")[0];
  };

  var scrollToContent = function(content) {
    
    var scroll = setInterval(function() {
      if (content.offsetTop > window.scrollY && window.scrollY + 350 < window.innerHeight) { 
        window.scrollTo(0, window.scrollY + 5);
      } else {
        clearInterval(scroll);
      }

    },2);
    return true;
  };

  var scrollToTop = function() {
  	window.scrollTo(0, 0);
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

  var init = function() {
    setAutoScrollToContent();
    watchState();

    for (var EVENT in Constants.EVENT.ANIMATION) {
      UtilitiesService.setListeners(EVENT, handleAnimations);
    }
  };

  return {
    init: init
  };
}]);