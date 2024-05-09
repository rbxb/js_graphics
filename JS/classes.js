var vert = function(v) {
	this.x = parseFloat(v[0]);
	this.y = parseFloat(v[1]);
	this.z = parseFloat(v[2]);
}

var flatVert = function(v) {
	this.x = v[0];
	this.y = v[1];
}

var poly = function(p) {
	this.a = p[0];
	this.b = p[1];
	this.c = p[2];
	this.color = p[3];
	this.N;
	this.aN;
}

var objectVertSet = function(verts) {
	return verts;
}

var polyVertSet = function(poly,verts) {
	this.a = verts[poly.a];
	this.b = verts[poly.b];
	this.c = verts[poly.c];
	this.N;
	this.aN;
}

var projected = function(poly,vertSet) {
	this.a = project(vertSet.a);
	this.b = project(vertSet.b);
	this.c = project(vertSet.c);
	this.N = project(vertSet.N);
	this.aN = project(vertSet.aN);
}

var transformation = function(pos,rot,scl,cen) {
	this.pos = new vert(pos);
	this.rot = new vert(rot);
	this.scl = new vert(scl);
	if (cen == 0) {
		this.cen = 0;
	}
	else this.cen = new vert(cen);
	this.bakedRot;
	this.bakeRotations = function() {
		this.bakedRot = new rotation(this.rot);
	};
}

var rotation = function(rot) {
	this.sin = new vert([
		Math.sin((rot.x+90)/57.2958),
		Math.sin(rot.y/57.2958),
		Math.sin(rot.z/57.2958)
	]);
	this.cos = new vert([
		Math.cos((rot.x+90)/57.2958),
		Math.cos(rot.y/57.2958),
		Math.cos(rot.z/57.2958)
	]);
}

var object = function(verts,polys,trans) {
	var newVerts = [];
	for (var i = 0; i < verts.length; i++) {
		newVerts.push(new vert(verts[i]));
	}
	this.verts = newVerts;
	var newPolys = [];
	for (var i = 0; i < polys.length; i++) {
		newPolys.push(new poly(polys[i]));
	}
	this.polys = newPolys;
	this.trans = trans;
	this.worldVerts;
}

var texture = function(canvas,context) {
	this.W = canvas.width;
	this.H = canvas.height;
	this.data = [];
	for (var i = 0; i < this.W * this.H; i++) {
		var x = i % W;
		var y = (i - x) / W;
		var c = context.getImageData(x, y, 1, 1).data;
		this.data.push(c);
	}
}