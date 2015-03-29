var LnkAPP = angular.module("LnkAPP", [ "ui.router", "angular-cookies" ]);

LnkAPP.config(["$stateProvider", "$urlRouterProvider", "Constants",
  function($stateProvider, $urlRouterProvider, Constants) {
  $urlRouterProvider.otherwise("/");
  
  var STATE = Constants.STATE;

  $stateProvider
    .state(STATE.ART, {
      url: "/art",
      templateUrl: "views/partials/art.html"
    })
    .state(STATE.CODE, {
      url: "/code",
      templateUrl: "views/partials/code.html"
    })
    .state(STATE.GALLERY, {
      url: "/art/:galleryId",
      templateUrl: "views/partials/gallery.html"
    })
    .state(STATE.HOME, {
      url: "/",
      templateUrl: "views/partials/home.html"
    })
    .state(STATE.LIFE, {
      url: "/life",
      templateUrl: "views/partials/life.html"
    })
    .state(STATE.PLACEHOLDER, {
      url: "/thanks",
      templateUrl: "views/partials/placeholder.html"
    })
    .state(STATE.PROJECT, {
      url: "/code/:projectId",
      templateUrl: "views/partials/project.html"
    })
    .state(STATE.RESUME, {
      url: "/life/resume",
      templateUrl: "views/partials/resume.html"
    });
}]).run(["NavigationService", "AnimationService", "UserService", 
  function(NavigationService, AnimationService, UserService) {

    NavigationService.init();
    AnimationService.init();
    UserService.init();
    
}]);
