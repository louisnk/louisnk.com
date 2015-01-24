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

  var scrollToTop = function() {
  	console.log("to the moon!");
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