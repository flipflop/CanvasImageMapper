/*
Author: Rozario Chivers
Date: 27/07/2006

Reads area tags of an image map 
uses coords to plot polygons
for use in Canvas
*/
 
var canvasImageMap = {
	
	ctx : {},
	//rgb alpha stroke colour
	fillColour : "rgba(255,255,255,0.4)",
	lineWidth : 5,
	canvas : {},
	
	init : function() {
	// initialise map
		canvasImageMap.setUpMap();
		canvasImageMap.registerEvents();
	}, //end init	
	
	registerEvents : function() {
		// add mouseover / mouseout events
		$("#colourwheel area").bind("mouseover", function() {
				fillColour = "rgba(0,0,0,0.4)";
				strokeColour = "rgba(255,255,255,0.4)";
				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
			}
		);
		
		$("#colourwheel area").bind("focus", function() {
				fillColour = "rgba(0,0,0,0.4)";
				strokeColour = "rgba(255,255,255,0.4)";
				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
			}
		);
			
		$("#colourwheel area").bind("mouseout", function() {
				fillColour = "rgba(0,0,0,0)";
				strokeColour = "rgba(255,255,255,0.4)";
				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
				canvasImageMap.clearRegion(this.coords, this.shape);
			}
		);
		
		$("#colourwheel area").bind("blur", function() {
				fillColour = "rgba(0,0,0,0)";
				strokeColour = "rgba(255,255,255,0.4)";
				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, true);
				canvasImageMap.clearRegion(this.coords, this.shape);
			}
		);
		
		$("#colourwheel area").bind("click", function() {
				fillColour = "rgba(255,255,255,0.4)";
				strokeColour = "rgba(255,255,255,0.4)";
				canvasImageMap.drawRegion(this.coords, strokeColour, fillColour, false, true);
			}
		);
		
	}, // end registerEvents

	setUpMap : function() {
		//set canvas area	
		// get the canvas element
		canvasImageMap.canvas = $("#area")[0];
		// use getContext to use the canvas for drawing
		canvasImageMap.ctx = canvasImageMap.canvas.getContext("2d");
		canvasImageMap.ctx.fillStyle = canvasImageMap.fillColour;
		canvasImageMap.ctx.lineWidth = canvasImageMap.lineWidth;
	},
	
	drawRegion : function(coords, strokeColour, fillColour, stroke, fill) {
		// populate with parsed values
		var coordsRef = coords.split(",");
		
		var regionLength = coordsRef.length;
		canvasImageMap.ctx.save();
		canvasImageMap.ctx.strokeStyle = strokeColour;
		canvasImageMap.ctx.fillStyle = fillColour;
		canvasImageMap.ctx.beginPath();
		//move to start point
		canvasImageMap.ctx.moveTo( coordsRef[0], coordsRef[1] ) ;
			for( var i=0; i < regionLength; i++ ) {
				if(i % 2 == 0 && i > 1) {
					//plot remaining x y pairs
					canvasImageMap.ctx.lineTo(coordsRef[i],coordsRef[i+1]);
				}
		}
		
		canvasImageMap.ctx.closePath();
		
		if (stroke) canvasImageMap.ctx.stroke();
		if (fill) canvasImageMap.ctx.fill();
		
		canvasImageMap.ctx.restore();
	}, // end drawRegion	
	
	clearRegion : function(coords,shapeRef) {
		//clear 
		canvasImageMap.ctx.clearRect(0, 0, $(canvasImageMap.canvas).height(), $(canvasImageMap.canvas).width() );
	}
} // end canvasImageMap
    
	



	  
  
	  
  

