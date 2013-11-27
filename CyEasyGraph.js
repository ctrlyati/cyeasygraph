function createGraph(config_object, canvas_object){

	var config = config_object;
	var padding = 50;
	if(config.padding){
		padding = config.padding;
	}

	var herKey = true;

	if(config.herKey==false){
		//console.log(herKey +"-"+ config.herKey);
		herKey = config.herKey;
	}

	var scaleLine = []
	if(config.scaleLine){
		scaleLine = config.scaleLine;
	}

	var scaleLineVertical = false;
	if(config.scaleLineVertical){
		scaleLineVertical = config.scaleLineVertical;
	}

	var canvas = canvas_object;
	var context = canvas.getContext("2d");

	var width = canvas.width;;
	var height = canvas.height;
	if(config.width){
		width = config.width;
	}
	if(config.height){
		height = config.height;
	}

	var lineColor = "#555";
	var scaleLineColor = "#CCC";
	var bgColor = "#FFF";
	var baseScaleLineColor = "#CCC";
	
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

	var font = {
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


	var max_base = 0;
	var min_base = 0;

	var sx = 0;
	var sy = 0;

	var data = [];
	if(config.data){
		data = config.data;
	}

	for(var i=0; i<data.length; i++){
		var d = data[i];
		if(max_base<d.value){
			max_base = d.value;
		}
		if(min_base>d.value){
			min_base = d.value;
		}
	}
	//console.log("MIN,MAX - "+min_base+", "+max_base);

	
	sx = (width-padding*2)/(data.length-1);
	sy = (height-padding*2)/(max_base-min_base);

	//console.log("Scale - "+sx+","+sy);


	//DRAW BACKGROUND
	/////////////////
	context.fillStyle = bgColor;
	context.fillRect(0,0,width,height);


	//DRAW SCALE LINE HER
	/////////////////////
	context.strokeStyle = scaleLineColor;
	var sumScaleWeight = 0;
	var sly = 0;
	if(scaleLine.length>0){
		for (var i = 0; i<scaleLine.length; i++) {
			sumScaleWeight += scaleLine[i].weight;
		}
		var sly = (height-padding*2)/sumScaleWeight;
		var sumScaleWeightInterval = 0;
		for (var i = 0; i<scaleLine.length; i++) {
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
		for (var i = 0; i < data.length; i++) {
			context.beginPath();
			context.moveTo((i*sx+padding),padding);
			context.lineTo((i*sx+padding),height-padding);
			context.stroke();
		}
	}


	//DRAW SCALE BASE LINE
	//////////////////////
	context.strokeStyle = baseScaleLineColor;
	//context.strokeRect(padding,padding,width-padding, height-padding);
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
	for(var i=0; i<data.length; i++){
		context.lineTo(i*sx+padding,(height-padding)-sy*(data[i].value-min_base));
		//console.log("DRAW TO ("+i+","+data[i].value+") - "+(i*sx+padding)+","+((height-padding)-sy*(data[i].value-min_base)));
		if(data[i].key){
			context.textAlign = "center";
			if(herKey){
				context.fillText(data[i].key, i*sx+padding, height-padding+font.size);
			}
		}
	}
	context.stroke();
	

}