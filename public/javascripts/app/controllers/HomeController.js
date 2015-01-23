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

