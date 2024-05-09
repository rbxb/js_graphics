var ani0 = function() {
	var pos = [0,0,0];
	var rot = [0,0,0];
	var scl = [1,1,1];
	var cen = [0,0,0];
	return new transformation(pos,rot,scl,cen);
}

var object2tran = function() {
	var pos = [0,0,100];
	var rot = [0,t/3,0];
	var scl = [6,6,6];
	var cen = [0,0,0];
	return new transformation(pos,rot,scl,cen);
}

var object1tran = function() {
	var pos = [0,-5,100];
	var rot = [0,0,0];
	var scl = [4,4,4];
	var cen = [0,0,0];
	return new transformation(pos,rot,scl,cen);
}

var sceneObjTran = function() {
	var pos = [0,0,100];
	var rot = [0,0,0];
	var scl = [0.5,0.5,0.5];
	var cen = [0,0,0];
	return new transformation(pos,rot,scl,cen);
}



var cameraTran = function() {
	var pos = [-cameraPos[0],-cameraPos[1],-cameraPos[2]];
	var rot = [-cameraRot[0],-cameraRot[1],-cameraRot[2]];
	var scl = [1,1,1];
	var cen = cameraPos;
	return new transformation(pos,rot,scl,cen);
}

var cameraPos = [0,0,0];
var cameraRot = [0,0,0];

var cameraTrans = [cameraTran];