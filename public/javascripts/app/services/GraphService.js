LnkAPP.factory("GraphService", ["Constants", function(Constants) {
	console.log("ja know");

	var donutGraph = function(params, section) {
		params = params || { data: [[0,25, "#f00"], [25, 65, "#00f"], [75, 100, "#0f0"]] };

		var d3data = params.data;
		var w = $(section).width(), h = $(section).height();
		var scale = d3.scale.linear().domain([0,100]).range([0, Math.PI * 2]);
		var graph = d3.select(section);
		var arc = d3.svg.arc().innerRadius(50).outerRadius(100)
													.startAngle(function(d) { return scale(d[0]); })
													.endAngle(function(d) { return scale(d[1]); });

		graph.selectAll("path").data(d3data).enter().append("path").attr("d", arc)
													 .style("fill", function(d) { return d[2]; }).attr("transform", "translate(" + w/2 + "," + h/2 + ")");

	};

	return {
		donutGraph: donutGraph
	};
}]);
