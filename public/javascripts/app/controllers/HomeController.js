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

