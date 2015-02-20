LnkAPP.factory("AnimationService", ["$rootScope", "$state", "Constants", "UtilitiesService",
  function($rootScope, $state, Constants, UtilitiesService) {

  var ANIM_EVENTS = Constants.EVENT.ANIMATION;
  var scrolledAlready = false;
  var mobile = UtilitiesService.isMobile();

  var drawCircles = function(target, level) {
    var canvas = document.getElementsByClassName(target)[0],
        context = canvas.getContext("2d"),
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        radius = 70;

    function drawArc() {
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      return this;
    }

    function fill(color) {
      context.fillStyle = color;
      context.fill();
      return this;
    }

    function stroke(width, color) {
      context.lineWidth = width;
      context.strokeStyle = (color && color) || width;
      context.stroke();
      return this;
    }

    if (!level) {
      drawArc().fill("black").stroke(30, "black");
    } else {

    }
  };

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

  var init = function() {
    if (window.innerWidth > 993) { setAutoScrollToContent(); }
    watchState();

    for (var EVENT in Constants.EVENT.ANIMATION) {
      UtilitiesService.setListeners(EVENT, handleAnimations);
    }
  };

  return {
    init: init,
    drawCircles: drawCircles
  };
}]);