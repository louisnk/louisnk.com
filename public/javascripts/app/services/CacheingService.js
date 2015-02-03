LnkAPP.factory("CacheingService", ["$cacheFactory",
	function($cacheFactory) {
	// TODO: Make this use localStorage, or something of the sort

	return $cacheFactory("LnkCache");
}]);
