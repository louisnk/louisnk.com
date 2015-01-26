LnkAPP.factory("CacheingService", ["UtilitiesService", 
	function(UtilitiesService) {
	// TODO: Make this use localStorage, or something of the sort
	var registry = [];
	var Utils = UtilitiesService;

	var register = function(requestedName, data) {
		if (!Utils.findWhere(registry, { name: requestedName }).index ) {
			registry.push({
				name: requestedName,
				data: data
			});
		} else {
			console.warn("Somehow I tried to re-register data for " + requestedName);
			return Utils.findWhere(registry, { name: requestedName }.data;
		}
	};

	var remove = function(requestedName) {
		var index = Utils.findWhere(registry, { name: requestedName });
		var deleted = registry.splice(index, 1);
		if (deleted.name === requestedName) {
			return true;
		} else {
			return false;
		}
	};

	var getFromRegistry = function(requestedName) {
		if (registry.length > 0) {
			var cachedData = registry.filter(function(chunk) {
				return chunk.name === requestedName;
			})[0];

			if (!cachedData) {
				return false;
			} else { return cachedData.data; }
		} else {
			return false;
		}
	};

	return {
		getFromRegistry: getFromRegistry,
		register: 	register,
		remove: 	remove
	};
}]);