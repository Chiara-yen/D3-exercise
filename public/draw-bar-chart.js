require('./svg.less');
var d3 = require('d3');
var colorbrewer = require('colorbrewer');


var w = 1200;
var h = 400;
var num = 35;

var dataset = [];
for(var i = 0; i < num; i++) {
	var hash = Math.random()*100;
	dataset.push(hash);
}

var perW = w/dataset.length;
var perPadding = 2;


var svg = d3.select('body')
			.append('svg')
			.attr({
				id: 'bar-chart',
				class: 'svg',
				width: w,
				height: h
			});

var rects = svg.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect')
				.attr({
					width: function(d,i) { return perW - perPadding; },
					height: function(d,i) { return d; },
					x: function(d,i) { return perW * i; },
					y: function(d,i) { return h - d; },
					fill: function(d,i) {
						var index = Math.round( i % 9 );
						return colorbrewer.YlGnBu[9][index];
					}
				});

var texts = svg.selectAll('text')
				.data(dataset)
				.enter()
				.append('text')
				.text(function(d) { return Math.round(d); })
				.attr({
					x: function(d,i) { return perW * i + perW/2; },
					y: function(d,i) { return h - d - 6 ; },
					class: 'bar-chart-text'
				});