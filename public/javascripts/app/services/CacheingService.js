LnkAPP.factory("CacheingService", ["UtilitiesService", "Constants",
	function(UtilitiesService, Constants) {
	// TODO: Make this use localStorage, or something of the sort
	var registry = [];
	var Utils = UtilitiesService;

	var register = function(requestedName, data) {
		if (!registry.length || 
				!Utils.findWhere(registry, { name: requestedName }) ) {
			registry.push({
				name: requestedName,
				data: data
			});
		} else {
			console.warn("Somehow I tried to re-register data for " + requestedName);
			return Utils.findWhere(registry, { name: requestedName }).data;
		}
	};

	var deleteFromRegistry = function(requestedName) {
		var index = Utils.findWhere(registry, { name: requestedName }).index;
		var deleted = registry.splice(index, 1);
		if (deleted.name === requestedName) {
			return true;
		} else {
			return false;
		}
	};

	var getFromRegistry = function(requestedName) {
		if (registry.length > 0) {
			var cachedData = Utils.findWhere(registry, { name: requestedName });

			return cachedData && cachedData.data;
		} else {
			return false;
		}
	};

	return {
		deleteFromRegistry: 		deleteFromRegistry,
		getFromRegistry: 				getFromRegistry,
		register: 							register
	};
}]);
