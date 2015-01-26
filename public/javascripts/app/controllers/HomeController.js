LnkAPP.controller("HomeController", ["$scope", "$stateParams", "UtilitiesService", "Constants",
  function($scope, $stateParams, UtilitiesService, Constants) {

  var dataHandler = function(data, other) {
    if (data && data.title) {
      if (data.sections.length > 0) {
        for (var i = 0; i < data.sections.length; i++) {
          data.sections[i] = UtilitiesService.parseConstants(data.sections[i]);
        }
        $scope.page = data;
      }
    } else {
      // get some generic json to show an error?
    }
  };

  $scope.getData(Constants.STATE.HOME, dataHandler);

}]);

