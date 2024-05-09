function combineVerts(a,b,op) {
	if (op == "+") return new vert([a.x + b.x, a.y + b.y, a.z + b.z]);
	if (op == "-") return new vert([a.x - b.x, a.y - b.y, a.z - b.z]);
	if (op == "*") return new vert([a.x * b.x, a.y * b.y, a.z * b.z]);
	if (op == "/") return new vert([a.x / b.x, a.y / b.y, a.z / b.z]);
}

function objectTransform(verts,trans) {
	var newVerts = [];
	for (var i = 0; i < verts.length; i++) {
		var newVert = verts[i];
		for (var j = 0; j < trans.length; j++) {
			newVert = transform(newVert,trans[j]);
		}
		newVerts.push(newVert);
	}
	return newVerts;
}

function rotate(v,rot) {
	var sinX = rot.sin.x;
	var sinY = rot.sin.y;
	var sinZ = rot.sin.z;

	var cosX = rot.cos.x;
	var cosY = rot.cos.y;
	var cosZ = rot.cos.z;

	//z axis rotation
	var x1 = v[0] * cosZ - v[1] * sinZ;
	var y1 = v[0] * sinZ + v[1] * cosZ;
	var z1 = v[2];
	
	//y axis rotation
	var x2 = x1 * cosY + z1 * sinY;
	var y2 = y1;
	var z2 = z1 * cosY - x1 * sinY;

	//x axis rotation
	var x3 = x2;
	var y3 = y2 * sinX - z2 * cosX;
	var z3 = y2 * cosX + z2 * sinX;

	return [x3,y3,z3];
}

function transform(v,tran) {

	var x = v.x - tran.cen.x;
	var y = v.y - tran.cen.y;
	var z = v.z - tran.cen.z;
	
	var rotated = rotate([x,y,z],tran.bakedRot);

	var x3 = rotated[0];
	var y3 = rotated[1];
	var z3 = rotated[2];

	//scale 

		var x4 = x3 * tran.scl.x;
		var y4 = y3 * tran.scl.y;
		var z4 = z3 * tran.scl.z;

	//position

		var x = x4 + tran.pos.x + tran.cen.x;
		var y = y4 + tran.pos.y + tran.cen.y;
		var z = z4 + tran.pos.z + tran.cen.z;

	return new vert([x,y,z]);
}

function project(v) {
	r = dis / v.z;
	return new vert([
		r*v.x + w, 
		r*v.y + h,
		v.z
	]);
}

function undoProject(v) {
	var z = v.z;
	var r = dis / z;
	var x = (v.x - w) / r;
	var y = (v.y - h) / r;
	return new vert([x,y,z]);
}

function normalize(n) {
	var mag = dist(origin,n)
	var N = new vert([
		Math.round(n.x / mag * 10000) / 10000,
		Math.round(n.y / mag * 10000) / 10000,
		Math.round(n.z / mag * 10000) / 10000
	]);
	return N;
}

function normal(vertSet) {
	var a = origin;
	var b = combineVerts(vertSet.b,vertSet.a,"-");
	var c = combineVerts(vertSet.c,vertSet.a,"-");
	var ab = combineVerts(a,b,"-");
	var ac = combineVerts(a,c,"-");
	var n = new vert([
		ab.y * ac.z - ab.z * ac.y,
		ab.z * ac.x - ab.x * ac.z,
		ab.x * ac.y - ab.y * ac.x
	]);
	return normalize(n);
}

function dotProduct(a,b) {
	return a.x*b.x + a.y*b.y + a.z*b.z;
}

function cull(vertSet) {
	var DP = dotProduct(vertSet.a,vertSet.N);
	if (DP >= 0) return true;
	else return false;
}

function dist(a,b) {
	return Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2) + Math.pow(a.z-b.z,2));
}

function checkZ(x,y,z) {
	if (near < z < far) {
		var newZ = Math.sqrt((far - near) * z) + near;
		var bc = y * W + x;
		if (newZ < zd[bc]) {
			zd[bc] = newZ;
			return true;
		}
		else return false;
	}
	else return false;
}

function interpolateZ(a,b,x,y) {
	var s = Math.sqrt(Math.pow(a.x - x, 2) + Math.pow(a.y - y, 2)) / Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	var z = (1 / ( (1 / a.z) + (s) * ( (1 / b.z) - (1 / a.z) ) ));
	return z;
}

/*function findZ(a,b,c,x,y) {
	var denom = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
	var w1 = ((b.y - c.y) * (x - c.x) + (c.x - b.x) * (y - c.y)) / denom;
	var w2 = ((c.y - a.y) * (x - c.x) + (a.x - c.x) * (y - c.y)) / denom;
	var w3 = 1 - w2 - w1;
	var z = (a.z * w1) + (b.z * w2) + (c.z * w3);
	return z;
}*/

function checkPoly(vertSet) {
	if (vertSet.a.z > near && vertSet.b.z > near && vertSet.c.z > near) return true;
	else return false;
}