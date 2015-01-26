LnkAPP.factory("CacheingService", [function() {

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
			})[0].data;

			if (!cachedData) {
				return false;
			} else { return cachedData; }
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