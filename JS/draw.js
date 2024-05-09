function pixel(x,y,color) {
	if (x >= 0 && x < W & y >= 0 && y < H) { 
		var mc = (y * W + x) * 4;
		img[mc]   = color[0];
		img[++mc] = color[1];
		img[++mc] = color[2];
	}
}

function drawFlatTop(a,b,c,color) {
	//slopes
	var m0 = (c.x - a.x) / (c.y - a.y);
	var m1 = (c.x - b.x) / (c.y - b.y);
	//start and end lines
	var yStart = Math.ceil(a.y - 0.5);
	var yEnd   = Math.ceil(c.y - 0.5);
	for (var y = yStart; y < yEnd; y++) {
		var x0 = m0 * (y + 0.5 - a.y) + a.x;
		var x1 = m1 * (y + 0.5 - b.y) + b.x;
		var xStart = Math.ceil(x0 - 0.5);
		var xEnd   = Math.ceil(x1 - 0.5);
		var d = new vert([xStart,yStart,interpolateZ(a,c,xStart,yStart)]);
		var e = new vert([xEnd  ,yEnd  ,interpolateZ(b,c,xEnd  ,yEnd  )]);
		for (var x = xStart; x <= xEnd; x++) {
			if (x >= 0 && x < W && y >= 0 && y < H) {
				var z = interpolateZ(d,e,x,y);
				//var z = findZ(a,b,c,x,y);
				if (checkZ(x,y,z) == true) {
					pixel(x,y,color);
				}
			}
		}
	}
}

function drawFlatBottom(a,b,c,color) {
	//slopes
	var m0 = (b.x - a.x) / (b.y - a.y);
	var m1 = (c.x - a.x) / (c.y - a.y);
	//start and end lines
	var yStart = Math.ceil(a.y - 0.5);
	var yEnd   = Math.ceil(c.y - 0.5);
	for (var y = yStart; y < yEnd; y++) {
		var x0 = m0 * (y + 0.5 - a.y) + a.x;
		var x1 = m1 * (y + 0.5 - a.y) + a.x;
		var xStart = Math.ceil(x1 - 0.5);
		var xEnd   = Math.ceil(x0 - 0.5);
		var d = new vert([xStart,yStart,interpolateZ(a,c,xStart,yStart)]);
		var e = new vert([xEnd  ,yEnd  ,interpolateZ(a,c,xEnd  ,yEnd  )]);
		for (var x = xStart; x <= xEnd; x++) {
			if (x >= 0 && x < W && y >= 0 && y < H) {
				var z = interpolateZ(d,e,x,y);
				//var z = findZ(a,b,c,x,y);
				if (checkZ(x,y,z) == true) {
					pixel(x,y,color);
				}
			}
		}
	}
}

function drawPoly(poly,vertSet) {
	var a = vertSet.a;
	var b = vertSet.b;
	var c = vertSet.c;
	var temp;
	//sort
	if (b.y < a.y) {temp=a;a=b;b=temp;}
	if (c.y < b.y) {temp=b;b=c;c=temp;}
	if (b.y < a.y) {temp=a;a=b;b=temp;}

	//flat top
	if (a.y == b.y) {
		if (a.x > b.x) {temp=a;a=b;b=temp;}
		drawFlatTop(a,b,c,poly.color);
	}
	//flat bottom
	else if (b.y == c.y) {
		if (c.x > b.x) {temp=b;b=c;c=temp;}
		drawFlatBottom(a,b,c,poly.color);
	}
	//general triangle
	else {
		//split vertex
		var alpha = 
			(b.y - a.y)/
			(c.y - a.y);
		var split = new flatVert([(a.x + (c.x - a.x) * alpha),b.y]);
		var d = new vert([
				split.x,
				split.y,
				//findZ(a,b,c,split.x,split.y)
				interpolateZ(a,c,split.x,split.y)
				]);
		//major right
		if (b.x < split.x) {
			drawFlatBottom(a,d,b,poly.color);
			drawFlatTop(b,d,c,poly.color);
		}

		//major left
		else {
			drawFlatBottom(a,b,d,poly.color);
			drawFlatTop(d,b,c,poly.color);
		}
	}
}

function dot(v,color) {
	if (!color) var color = [255,255,255];
	var x = Math.ceil(v.x - 0.5);
	var y = Math.ceil(v.y - 0.5);
	pixel(x,y,color);
}