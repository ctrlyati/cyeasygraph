'use strict';
function createGraph(config_object, canvas_object){

	const config = config_object;
	let padding = 50;
	if(config.padding){
		padding = config.padding;
	}

	let herKey = true;

	if(config.herKey==false){
		herKey = config.herKey;
	}

	let scaleLine = []
	if(config.scaleLine){
		scaleLine = config.scaleLine;
	}

	let scaleLineVertical = false;
	if(config.scaleLineVertical){
		scaleLineVertical = config.scaleLineVertical;
	}

	const canvas = canvas_object;
	const context = canvas.getContext("2d");

	let width = canvas.width;;
	let height = canvas.height;
	if(config.width){
		width = config.width;
	}
	if(config.height){
		height = config.height;
	}

	let lineColor = "#555";
	let scaleLineColor = "#CCC";
	let bgColor = "#FFF";
	let baseScaleLineColor = "#CCC";
	
	if(config.lineColor){
		lineColor = config.lineColor;
	}
	if(config.scaleLineColor){
		scaleLineColor = config.scaleLineColor;
	}
	if(config.bgColor){
		bgColor = config.bgColor;
	}
	if(config.baseScaleLineColor){
		baseScaleLineColor = config.baseScaleLineColor;
	}

	const font = {
			family : 	"Calibri",
			size  : 	12,
			color : 	"#555",
		};
	if (config.font) {
		if(config.font.family){
			font.family = config.font.family;
		}
		if(config.font.size){
			font.size = config.font.size;
		}
		if(config.font.color){
			font.color = config.font.color;
		}
	}


	let max_base = 0;
	let min_base = 0;

	let sx = 0;
	let sy = 0;

	let data = [];
	if(config.data){
		data = config.data;
	}

	for(let i=0; i<data.length; i++){
		let d = data[i];
		if(max_base<d.value){
			max_base = d.value;
		}
		if(min_base>d.value){
			min_base = d.value;
		}
	}

	
	sx = (width-padding*2)/(data.length-1);
	sy = (height-padding*2)/(max_base-min_base);


	//DRAW BACKGROUND
	/////////////////
	context.fillStyle = bgColor;
	context.fillRect(0,0,width,height);


	//DRAW SCALE LINE HER
	/////////////////////
	context.strokeStyle = scaleLineColor;
	let sumScaleWeight = 0;
	let sly = 0;
	if(scaleLine.length>0){
		for (let i = 0; i<scaleLine.length; i++) {
			sumScaleWeight += scaleLine[i].weight;
		}
		sly = (height-padding*2)/sumScaleWeight;
		let sumScaleWeightInterval = 0;
		for (let i = 0; i<scaleLine.length; i++) {
			context.fillStyle = scaleLineColor;
			context.beginPath();
			context.moveTo(padding,
				height-padding-(sly*scaleLine[i].weight + sly*sumScaleWeightInterval));
			context.lineTo(width-padding,
				height-padding-(sly*scaleLine[i].weight + sly*sumScaleWeightInterval));
			context.stroke();
			context.textAlign = "right";
			context.fillStyle = font.color;
			context.fillText(scaleLine[i].key, padding, 
				height-padding-(sly*scaleLine[i].weight + sly*sumScaleWeightInterval)+font.size/2);
			sumScaleWeightInterval += scaleLine[i].weight;
		}
	}

	//DRAW SCALE LINE VERTICAL
	//////////////////////////
	context.strokeStyle = scaleLineColor;
	if(scaleLineVertical){
		for (let i = 0; i < data.length; i++) {
			context.beginPath();
			context.moveTo((i*sx+padding),padding);
			context.lineTo((i*sx+padding),height-padding);
			context.stroke();
		}
	}


	//DRAW SCALE BASE LINE
	//////////////////////
	context.strokeStyle = baseScaleLineColor;
	context.beginPath();
	context.moveTo(padding, padding);
	context.lineTo(padding, height-padding);
	context.lineTo(width-padding, height-padding);
	context.stroke();


	//DRAW BASE TEXT
	////////////////
	context.font = font.size+"px "+font.family;
	context.fillStyle =  font.color;
	context.textAlign = "center";
	context.save();

	context.translate(padding/2, height/2);
	context.rotate(-Math.PI/2);
	context.textAlign = "center";
	context.fillText(config.yName, 0,0);
	context.restore();

	context.textAlign = "center";
	context.fillText(config.xName, width/2, height-padding/2+font.size/2);
	context.restore();




	//DRAW GRAPH
	////////////
	context.strokeStyle = lineColor;
	context.beginPath();
	if(data.length>0){
		context.moveTo(0*sx+padding,(height-padding)-sy*(data[0].value-min_base));
	}
	for(let i=0; i<data.length; i++){
		context.lineTo(i*sx+padding,(height-padding)-sy*(data[i].value-min_base));
		if(data[i].key){
			context.textAlign = "center";
			if(herKey){
				context.fillText(data[i].key, i*sx+padding, height-padding+font.size);
			}
		}
	}
	context.stroke();
	

}