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
