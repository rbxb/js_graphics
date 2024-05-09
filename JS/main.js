var objects = [object2];
var origin = new vert([0,0,0]);

function frame(timestamp) {
	time(timestamp);
	clearZBuffer();
	clearIMG();
	
	//word transform

	//object loop
	for (var o = 0; o < objects.length; o++) {
		var object = objects[o];
		var bakedTrans = bakeTrans(object.trans);
		var verts = objectTransform(object.verts,bakedTrans);
		object.worldVerts = new objectVertSet(verts);
		var polys = object.polys;
		for (var p = 0; p < polys.length; p++) {
			var poly = polys[p];
			poly.worldVerts = new polyVertSet(poly,object.worldVerts);
			poly.worldVerts.N = normal(poly.worldVerts);
			poly.worldVerts.aN = combineVerts(poly.worldVerts.N,poly.worldVerts.a,"+");
		}
	}
	
	//light render
	
	//camera render
	
	//object loop
	for (var o = 0; o < objects.length; o++) {
		var object = objects[o];
		var bakedTrans = bakeTrans(cameraTrans);
		var verts = objectTransform(object.worldVerts,bakedTrans);
		object.cameraVerts = new objectVertSet(verts);
		var polys = object.polys;
		for (var p = 0; p < polys.length; p++) {
			var poly = polys[p];
			poly.cameraVerts = new polyVertSet(poly,object.cameraVerts);
			poly.cameraVerts.N = normal(poly.cameraVerts);
			poly.cameraVerts.aN = combineVerts(poly.cameraVerts.N,poly.cameraVerts.a,"+");
			if (cull(poly.cameraVerts) == false) {
				poly.cameraProject = new projected(poly,poly.cameraVerts);
				if (checkPoly(poly.cameraProject) == true) {
					drawPoly(poly,poly.cameraProject);
					//dot(poly.proj.a);
					//dot(poly.proj.b);
					//dot(poly.proj.c);
					//dot(poly.proj.aN);
				}
			}
		}
		dot(new vert([w,h+1,0]),[200,200,200]);
		dot(new vert([w,h-1,0]),[200,200,200]);
		dot(new vert([w+1,h,0]),[200,200,200]);
		dot(new vert([w-1,h,0]),[200,200,200]);
	}

	ctx.putImageData(frameimg,0,0);
	if (pointerLocked) {
		window.requestAnimationFrame(frame);
	}
}