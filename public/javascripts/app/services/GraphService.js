LnkAPP.factory("GraphService", ["Constants", function(Constants) {

	var scale = d3.scale.linear().domain([0,100]).range([0, Math.PI * 2]),

	init = function() {
		setListeners();
	},

	setListeners = function() {

	},

	/**
	 *	Creates an array with all 3 params needed for d3 donut graphs
	 *
	 *	@param  params 				[object] 
	 */
	paramsArray = function(params) {
		params = params && params.level ? params : { start: 0, level: 100, color: "#000" };

		return [[ -35,																	// start of the arc
		 				 parsePercentage(params.level) -35, 		// end of the arc
						 params.color || "#0c0"									// color of the arc fill
					 ]];
	},

	/**
	 *	Provides black "filler" data to make donuts 360°
	 */
	fillSection = function(params) {
		return [ params[0][1], 65, "#000" ];
	},

	/**
	 *	Takes the "level" property from a skill object and makes sense of it. Returns a number.
	 */
	parsePercentage = function(percentage) {
		if (typeof percentage === "number") {
			return Number(percentage);
		} else if (typeof percentage === "string") {
			return percentage.toLowerCase() === Constants.NINJA.toLowerCase() ? 99 : 50;
		} else {
			return 0;
		}
	},

	/**
	 * Does the heavy lifting to actually draw the donut graph.
	 *
	 *	@param  datas					[object || bool] if an object, parses relevant info for d3;
	 *																				 if a bool, creates generic half & half donuts
	 *
	 *	@param 	section 			[string] the selector for d3 to draw the arcs in
	 */
	makeDonutGraphFor = function(datas, section) {
		datas = new paramsArray(datas); 
		datas.push(fillSection(datas));

		var w = $(section).width(), h = $(section).height();
		var graph = d3.select(section);
		var arc = d3.svg.arc().innerRadius(75).outerRadius(120)
													.startAngle(function(d) { return scale(d[0]); })
													.endAngle(function(d) { return scale(d[1]); });

		graph.selectAll("path").data(datas).enter().append("path")
													 .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
													 .transition().duration(500)
													 .attr("d", arc)
													 .style("fill", function(d) { return d[2]; });
	};

	return {
		init: 							init,
		makeDonutGraphFor: 	makeDonutGraphFor
	};
}]);
