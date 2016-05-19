CyEasGraph
===========

![ScreenShot](https://raw.githubusercontent.com/ctrlyati/cyeasygraph/master/Images/001.PNG)

How to use Ctrlyati - CyEasyGraph

First of all, you need "CyEasyGraph.js" , you can download it here.
Download : CyEasyGraph.js

To create graph is so simple.
Just create canvas tag with any id, in this example I've create canvas that has "chart" as id. also this canvas can be any size.

	<canvas id="chart" width="1000px" height="400px"></canvas>
Then, you must provide us canvas element and config object.
As you can see chart is just to getElementById from document.

	var chart = document.getElementById("chart");
Config object is easy to config, all of parameter you must insert is var config={};
if you want to config this chart is just insert parameter as below (all of parameter that available is used in this code).

If this is config object

	var config = {};
the result is

![ScreenShot](https://raw.githubusercontent.com/ctrlyati/cyeasygraph/master/Images/002.PNG)

You can provide data for this graph as

	var config = {
		data : [
			{key : "0" , value : 300},
			{key : "1" , value : -10},
			{key : "2" , value : 30},
			{key : "3" , value : 300},
			{key : "4" , value : -10},
			{key : "5" , value : 30},
			{key : "6" , value : 300},
			{key : "7" , value : -10},
			{key : "8" , value : 30},
			{key : "9" , value : 300},
			{key : "10" , value : -10},
			{key : "11" , value : 30},
		
		],
	};
the result is

![ScreenShot](https://raw.githubusercontent.com/ctrlyati/cyeasygraph/master/Images/003.PNG)

You can also provid us some style parameter

	var config = {
		lineColor : 			"#FFF",
		scaleLineColor : 		"#999",
		baseScaleLineColor : 		"#000",
		bgColor : 			"#555",

		font : {
			family : 	"Calibri",
			size  : 	10,		//px
			color : 	"#FFF",
		},

		data : [
			{key : "0" , value : 300},
			{key : "1" , value : -10},
			{key : "2" , value : 30},
			{key : "3" , value : 300},
			{key : "4" , value : -10},
			{key : "5" , value : 30},
			{key : "6" , value : 300},
			{key : "7" , value : -10},
			{key : "8" , value : 30},
			{key : "9" , value : 300},
			{key : "10" , value : -10},
			{key : "11" , value : 30},
		
		],
	};
the result is

![ScreenShot](https://raw.githubusercontent.com/ctrlyati/cyeasygraph/master/Images/004.PNG)

this is all config you can edit.

	var config = {
		width : 		700,//px
		height : 		400,//px
		padding : 		50, //px

		lineColor : 			"#FFF",
		scaleLineColor : 		"#999",
		baseScaleLineColor : 		"#000",
		bgColor : 			"#555",

		
		font : {
			family : 	"Calibri",
			size  : 	10,		//px
			color : 	"#FFF",
		},
		

		xName : 	"Herizontal Scale",
		yName : 	"Vertical Scale",

		
		scaleLine : [
			{key : "0", weight: 0},
			{key : "1", weight: 1},
			{key : "2", weight: 2},
			{key : "3", weight: 3},
			{key : "4", weight: 4},
			{key : "5", weight: 5},
			{key : "6", weight: 6},
		],

		scaleLineVertical : true,

		herKey : false,
		
		data : [
			{key : "0" , value : 300},
			{key : "1" , value : -10},
			{key : "2" , value : 30},
			{key : "3" , value : 300},
			{key : "4" , value : -10},
			{key : "5" , value : 30},
			{key : "6" , value : 300},
			{key : "7" , value : -10},
			{key : "8" , value : 30},
			{key : "9" , value : 300},
			{key : "10" , value : -10},
			{key : "11" , value : 30},
		
		],
	};
after you create config object you just use this config to create line graph.

	createGraph(config, chart);
Finally you will got full-equiped line graph.

![ScreenShot](https://raw.githubusercontent.com/ctrlyati/cyeasygraph/master/Images/005.PNG)

Power by @ctrlyati - Oct, 2013
