/*
Author: Rozario Chivers
Date: 27/07/2006

Reads area tags of an image map 
uses coords to plot polygons
for use in Canvas
*/
    
var canvas, ctx;
//rgb alpha stroke colour
var fillColour = "rgba(255,255,255,0.4)";

function setUpMap() {
	// get the canvas element using the DOM
	var canvas = document.getElementById("area");
	//set canvas area
	//canvas.height = document.body.clientHeight;
	//canvas.width = document.body.clientWidth;
	
	//cater for map location variance
	var xoffset=0;
	var yoffset=0;
	
	// use getContext to use the canvas for drawing
	ctx = canvas.getContext("2d");
	ctx.fillStyle = fillColour;
	ctx.lineWidth = 5;
}
	  
function setUpMapRollovers() {
	if(!document.getElementsByTagName) return;
	setUpMap();
	var areaRef = document.getElementsByTagName("area");
	var areaRefLen=areaRef.length;
	//attach events
	var timeoutRollover = {};
	for(var i=0;i<areaRefLen;i++) {
		
		$(areaRef[i]).bind("mouseover", function() {
				fillColour = "rgba(255,255,255,0.4)";
				ctx.strokeStyle = fillColour; 
				drawRegion(this.coords);
			}
		);
		
		$(areaRef[i]).bind("mouseout", function() {
				fillColour = "rgba(255,255,255,0)";
				ctx.strokeStyle = fillColour; 
				drawRegion(this.coords);
				clearRegion(this.coords,this.shape);
			}
		);
	}	
}	  
	  
function drawRegion(coords) {
	var mapRef = $(".colourwheel")[0];
	
	var mapX = findPosX(mapRef);
	var mapY = findPosY(mapRef);
	
	var areaRef = document.getElementById("area");
	// container for parsed coordinates
	var coordsRef = new Array();
	// populate with parsed values
	coordsRef = coords.split(",");
	// position canvas area over map
	//area.style.top=mapY;
	//area.style.left=mapX;
	
	var regionLength = coordsRef.length;
	ctx.save();
	ctx.fillStyle = fillColour;
	ctx.beginPath();
	//move to start point
	ctx.moveTo(coordsRef[0],coordsRef[1]);
		for(var i=0;i<regionLength;i++) {
		var tmpstr="";
			if(i%2==0 && i>1) {
				//plot remaining x y pairs
				ctx.lineTo(coordsRef[i],coordsRef[i+1]);
			}
	}
	
	ctx.closePath();
	//ctx.fill();
	ctx.stroke();
	ctx.restore();
}	  

function clearRegion(coords,shapeRef) {
	//clear 
	ctx.clearRect(0, 0, 359, 194);
	//redraw last region
	if(shapeRef!="RECT" || shapeRef!="default") {
		drawRegion(coords);
	}
}
	  
//PPK's find element position
function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}