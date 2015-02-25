LnkAPP.factory("GraphService", ["Constants", function(Constants) {

	this.scale = d3.scale.linear().domain([0,100]).range([0, Math.PI * 2]);

	/**
	 *	Creates an array with all 3 params needed for d3 donut graphs
	 *
	 *	@param  params 				[object] ------TODO ???
	 */
	var paramsObject = function(params) {
		params = params || { skill: 100, color: "#000", start: 0 };

		return [ 	params.start || 0,			// start of the arc
							params.skill,  					// end of the arc
							params.color || "#0c0"	// color of the arc fill
		];
	};

	var parsePercentage = function(percentage) {

		if (percentage && typeof percentage === "number") {
			return percentage;
		} else if (percentage && typeof percentage === "string") {
			return percentage.toLowerCase() === Constants.NINJA.toLowerCase() ? 100 : 50;
		} else {
			return 0;
		}
	};

	var makeDonutGraphOf = function(params, section) {
		params = params || { data: [[0, -25, "#f00"], [10, 20, "#000"], [30, 40, "#000"]] };

		var d3data = params.data;
		var w = $(section).width(), h = $(section).height();
		var graph = d3.select(section);
		var arc = d3.svg.arc().innerRadius(50).outerRadius(100)
													.startAngle(function(d) { return scale(d[0]); })
													.endAngle(function(d) { return scale(d[1]); });

		graph.selectAll("path").data(d3data).enter().append("path").attr("d", arc)
													 .style("fill", function(d) { return d[2]; }).attr("transform", "translate(" + w/2 + "," + h/2 + ")");

	};

	return {
		makeDonutGraphOf: makeDonutGraphOf
	};
}]);
