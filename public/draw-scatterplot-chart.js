require('./svg.less');
var d3 = require('d3');
var colorbrewer = require('colorbrewer');

var w = 1200;
var h = 400;
var num = 30;

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
				.range([0, w]);

var yScale = d3.scale.linear()
				.domain([d3.min(dataset, function(d) { return d[1]; }),
						d3.max(dataset, function(d) { return d[1]; })])
				.range([0, h]);

var svg = d3.select('body')
			.append('svg')
			.attr({
				id: 'scatterplot-chart',
				class: 'svg',
				width: w,
				height: h
			});

var circles = svg.selectAll('circle')
				.data(dataset)
				.enter()
				.append('circle')
				.attr({
					cx: function(d,i) { return xScale(d[0]); },
					cy: function(d,i) { return h - yScale(d[1]); },
					r: function(d,i) { return Math.round(d[2]); },
					fill: function(d,i) {
						var index = Math.round( i % 9 );
						return colorbrewer.PiYG[9][index];
					}
				});

var texts = svg.selectAll('text')
				.data(dataset)
				.enter()
				.append('text')
				.text(function(d) { return Math.round(d[0]) + ' , ' + Math.round(d[1]); })
				.attr({
					x: function(d,i) { return xScale(d[0]); },
					y: function(d,i) { return h - yScale(d[1]); },
					class: 'scatterplot-chart-text'
				});