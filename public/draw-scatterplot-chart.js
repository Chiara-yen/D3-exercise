require('./svg.less');
var d3 = require('d3');
var colorbrewer = require('colorbrewer');

var padding = {top: 50, right: 80, bottom: 100, left: 100};
var outerW = 1200;
var outerH = 500;
var num = 50;
var dotSize = [5, 10, 15];

var w = outerW - padding.right - padding.left;
var h = outerH - padding.bottom - padding.top;
var xRange = [padding.left, outerW - padding.right];
var yRange = [outerH - padding.bottom, padding.top];

var dataset = [];
for(var i = 0; i < num; i++) {
	var data = [];
	data.push(getHash(1000));
	data.push(getHash(1000));
	data.push(getHash(20));
	dataset.push(data);
}

function getHash(magnification) {
	return Math.random()*magnification;
}

var xScale = d3.scale.linear()
				.domain([d3.min(dataset, function(d) { return d[0]; }),
						d3.max(dataset, function(d) { return d[0]; })])
				.range(xRange);

var yScale = d3.scale.linear()
				.domain([d3.min(dataset, function(d) { return d[1]; }),
						d3.max(dataset, function(d) { return d[1]; })])
				.range(yRange);

var rScale = d3.scale.quantize()
				.domain([d3.min(dataset, function(d) { return d[2]; }),
						d3.max(dataset, function(d) { return d[2]; })])
				.range(dotSize);

var svg = d3.select('body')
			.append('svg')
			.attr({
				id: 'scatterplot-chart',
				class: 'svg',
				width: outerW,
				height: outerH
			});

var circles = svg.selectAll('circle')
				.data(dataset)
				.enter()
				.append('circle')
				.attr({
					cx: function(d,i) { return xScale(d[0]); },
					cy: function(d,i) { return yScale(d[1]); },
					r: function(d,i) { return rScale(d[2]); },
					fill: function(d,i) {
						switch(rScale(d[2])){
							case dotSize[0]:
								return colorbrewer.YlOrBr[9][7];

							case dotSize[1]:
								return colorbrewer.YlOrBr[9][5];

							case dotSize[2]:
								return colorbrewer.YlOrBr[9][3];
						}
					}
				});

var texts = svg.selectAll('text')
				.data(dataset)
				.enter()
				.append('text')
				.text(function(d) { return Math.round(d[0]) + ' , ' + Math.round(d[1]); })
				.attr({
					x: function(d,i) { return xScale(d[0]); },
					y: function(d,i) { return yScale(d[1]); },
					class: 'scatterplot-chart-text'
				});

var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom');

var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left').
				ticks(5);

var xLines = svg.append('g')
				.attr({
					id: 'x-lines',
					class: 'lines',
					transform: 'translate(0,'+ (outerH - (padding.bottom / 3 * 2)) +')'
				})
				.call(xAxis);

var yLines = svg.append('g')
				.attr({
					id: 'y-lines',
					class: 'lines',
					transform: 'translate('+ (padding.left / 3 * 2) +',0)'
				})
				.call(yAxis);