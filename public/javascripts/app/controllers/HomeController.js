LnkAPP.controller("HomeController", ["$scope", "$stateParams", "UtilitiesService", "AnimationService", "Constants",
  function($scope, $stateParams, UtilitiesService, AnimationService, Constants) {

  var dataHandler = function(data, other) {
    if (data && data.title) {
      $scope.page = data;
      AnimationService.resizeBgHero();
    } else {  
      // get some generic json to show an error?
    }
  };

  $scope.getData(Constants.STATE.HOME, dataHandler);

}]);

