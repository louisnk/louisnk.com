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

