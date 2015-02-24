LnkAPP.factory("GraphsService", [function() {
	var donutGraph = function(params, section) {
		var scale = d3.scale.linear().domain([0,100]).range([0, Math.PI * 2]);
		var graph = d3.select(section);
	};

	return {
		donutGraph: donutGraph
	};
}]);