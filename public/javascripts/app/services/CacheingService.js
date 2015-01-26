LnkAPP.factory("CacheingService", [function() {
	// TODO: Make this use localStorage, or something of the sort
	var registry = [];

	var register = function(request, data) {
		registry.push({
			name: request,
			data: data
		});
	};

	var remove = function(request) {
		var index = UtilitiesService.findWhere(registry, { name: request });
	};

	var getFromRegistry = function(request) {
		if (registry.length > 0) {
			var cachedData = registry.filter(function(chunk) {
				return chunk.name === request;
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